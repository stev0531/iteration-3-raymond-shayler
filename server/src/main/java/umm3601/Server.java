package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.google.gson.*;
import spark.Request;
import spark.Response;

import umm3601.Authentication.AuthController;
import umm3601.card.CardController;
import umm3601.deck.DeckController;
import umm3601.Authentication.Auth;
import umm3601.Authentication.Cookie;
import umm3601.Authentication.UnauthorizedUserException;
import umm3601.classroom.ClassroomController;
import umm3601.user.*;

import java.io.*;
import java.security.NoSuchAlgorithmException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;


public class Server {
    private static final String databaseName = "i3-droptable-dev";
    private static int serverPort;

    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {

        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        CardController cardController = new CardController(database);

        DeckController deckController = new DeckController(database);

        UserController userController = new UserController(database);

        AuthController authController = new AuthController();

        ClassroomController classroomController = new ClassroomController(database);

        //Configure Spark
        //call to port moved down
        enableDebugScreen();

        // Specify where assets like images will be "stored"
        staticFiles.location("/public");

        ///////////////////////*
        // you will need to make a config.json file and put it in server folder.
        // it should look like:
        //{
        // "clientId" : "big string of text",
        // "clientSecret" : "small string of text"
        // }
        // get them from https://console.developers.google.com/apis/dashboard?project=sagecards-r-shayler
        // credentials screen
        //////////////////////*/

        String publicURL;
        String callbackURL;

        com.google.gson.stream.JsonReader reader =
            new com.google.gson.stream.JsonReader(new FileReader("src/config.json"));
        Gson gson = new Gson();
        Conf conf;
        conf = gson.fromJson(reader, Conf.class);
        callbackURL = conf.callbackURL;
        publicURL = conf.publicURL;
        serverPort = conf.serverPort;
        final boolean USEAUTH = conf.useAuth;

        //moved down here, post config.
        port(serverPort);


        Auth auth = new Auth(conf.clientId, conf.clientSecret, callbackURL);
//
//        options("/*", (request, response) -> {
//
//            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
//            if (accessControlRequestHeaders != null) {
//                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
//            }
//
//            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
//            if (accessControlRequestMethod != null) {
//                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
//            }
//
//            return "OK";
//        });

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

//            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
//            if (accessControlRequestMethod != null) {
//                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
//            }

            return "OK";
        });

        before((request, response) -> {

            //Handle authentication

            if (USEAUTH) {
                if (!(request.requestMethod().equals("OPTIONS"))) {
                    //the above lets preflight requests clear the API
                    System.out.println("New request: " + request.pathInfo());
                    if (needsAuth(request.pathInfo())) {
                        System.out.println("Checking Auth");
                        String cookie = request.cookie("ddg");
                        System.out.println(cookie);

                        if (!auth.authorized(cookie)) {
                            System.err.println("Auth denied");
                            System.out.println("The cookie \n " + cookie);
                            response.redirect(auth.getAuthURL(publicURL + "/api/authorize"));
                        } else {
                            System.out.println("Auth Passed");
                        }
                    }
                }
            } else {
                System.out.println("AUTH DISABLED");
            }

            response.header("Access-Control-Allow-Origin", request.headers("Origin"));
            System.out.println("Request origin: " + request.headers("Origin"));
            System.out.println("Request method: " + request.requestMethod());
            System.out.println("Request headers: " + request.headers("Access-Control-Request-Headers"));

            System.out.println("=======");

            response.header("Access-Control-Allow-Headers", request.headers("Access-Control-Request-Headers"));

            response.header("Access-Control-Allow-Credentials", "true");
            response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            // Note: this may or may not be necessary in your particular application
            response.type("application/json");


        });

        // Redirects for the "home" page
        redirect.get("", "/");

        //get("/", clientRoute);
        redirect.get("/", publicURL);

        /// Deck and Card Endpoints ///////////////////////////
        /////////////////////////////////////////////
        path("api/", () -> {
            get("cards/:id", cardController::getCard);
            get("cards", cardController::getCards);
            get("decks", deckController::getDecks);
            post("decks/add", deckController::addNewDeck);
            get("decks/:id", deckController::getDeck);
            post("decks/updateName", deckController::updateName);
            post("cards/add", cardController::addNewCard);
            post("addMany", cardController::addCardsToDeck);
            post("deleteMany", cardController::deleteCardsFromDeck);
            get("simple-cards", cardController::getSimpleCards);
            get("simple-decks", deckController::getSimpleDecks);
            get("classrooms", classroomController::getClassrooms);
            get("classroom:id", classroomController::getClassroom);
            get("users", userController::getUsers);
            get("user:id", userController::getUser);

            get("checkAuthorization", authController::checkAuthorization);
            get("authorize", (req, res) -> {
                String originatingURLs[] = req.queryMap().toMap().get("originatingURL");
                String originatingURL;
                if (originatingURLs == null) {
                    originatingURL = publicURL;
                } else {
                    originatingURL = originatingURLs[0];
                }
                res.redirect(auth.getAuthURL(originatingURL));
                // I think we could return an arbitrary value since the redirect prevents this from being used
                return res;
            });
        });


        get("/callback", (req, res) -> {
            Map<String, String[]> params = req.queryMap().toMap();
            String[] states = params.get("state");
            String[] codes = params.get("code");
            String[] errors = params.get("error");
            System.out.println("/callback reached");
            if (null == states) {
                // we REQUIRE that we be passed a state
                halt(400);
                return ""; // never reached
            }
            if (null == codes) {
                if (null == errors) {
                    // we don't have codes, but we don't have an error either, so this a garbage request
                    halt(400);
                    return ""; // never reached
                } else if ("access_denied".equals(errors[0])) {
                    // the user clicked "deny", so send them to the visitor page
                    res.redirect("/");
                    return ""; // send an empty body back on redirect
                } else {
                    // an unknown error was passed to us, so we halt
                    halt(400);
                    return ""; // not reached
                }
            }
            String state = states[0];
            String code = codes[0];
            System.out.println("Callback request seems valid, checking...");
            try {
                String originatingURL = auth.verifyCallBack(state, code);
                if (null != originatingURL) {
                    Cookie c = auth.getCookie();
                    res.cookie(c.name, c.value, c.max_age);
                    System.out.println("Innermost Auth script was run, redirecting to: ");
                    System.out.print(originatingURL + "\n");
                    res.redirect(originatingURL);
                    return ""; // not reached
                } else {
                    System.out.println("bad");
                    res.status(403);
                    return "?????"; // todo: return a reasonable message
                }
            } catch (UnauthorizedUserException e) {
                res.redirect("/");
                System.err.println("Unauthorized User exception");
                return ""; // not reached
            }
//            res.type("application/json");
//            Map<String, String[]> params = req.queryMap().toMap();
//            String state = params.get("state")[0];
//            String code = params.get("code")[0];
//            System.err.println(req);
//            return auth.getProfile(state, code);
        });

        //here is the part where, if the request has not matched anything so far, it should match
        //here and be served the angular bundle.

        get("/*", (req, res) -> {
            res.redirect("/");
            System.out.println("Bouncing back homepage");
            return res;
        });

        // Called after each request to insert the GZIP header into the response.
        // This causes the response to be compressed _if_ the client specified
        // in their request that they can accept compressed responses.
        // There's a similar "before" method that can be used to modify requests
        // before they they're processed by things like `get`.
        after("*", Server::addGzipHeader);

//        get("/*", clientRoute);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });
    }

    public static boolean needsAuth(String req) {
        Set<String> sensitiveURLs = new HashSet<>();

        sensitiveURLs.add("api/decks/add");
        sensitiveURLs.add("api/decks/updateName");
        sensitiveURLs.add("api/cards/add");
        sensitiveURLs.add("api/addMany");
        sensitiveURLs.add("api/deleteMany");
        if (sensitiveURLs.contains(req)) {
            return true;

        } else {
            return false;
        }
    }


    ///moved in here because Java is being weird.
    private class Conf {
        String clientId;
        String clientSecret;
        String publicURL;
        String callbackURL;
        boolean useAuth;
        int serverPort;
    }


    // Enable GZIP for all responses
    private static void addGzipHeader(Request request, Response response) {
        response.header("Content-Encoding", "gzip");
    }
}



