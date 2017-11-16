package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.google.gson.*;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.utils.IOUtils;

import umm3601.card.CardController;
import umm3601.deck.DeckController;
import umm3601.Authentication.Auth;
import umm3601.Authentication.Cookie;
import umm3601.Authentication.UnauthorizedUserException;
import umm3601.classroom.ClassroomController;
import umm3601.user.*;

import java.io.*;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;


public class Server {
    private static final String databaseName = "i3-droptable-dev";
    private static final int serverPort = 4567;;

    public static void main(String[] args) throws IOException, NoSuchAlgorithmException {

        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        CardController cardController = new CardController(database);

        DeckController deckController = new DeckController(database);

        UserController userController = new UserController(database);

        ClassroomController classroomController = new ClassroomController(database);

        //Configure Spark
        port(serverPort);
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
            new com.google.gson.stream.JsonReader(new FileReader("./config.json"));
        Gson gson = new Gson();
        Conf conf;
        conf = gson.fromJson(reader, Conf.class);
        callbackURL = conf.callbackURL;
        publicURL = conf.callbackURL;

        Auth auth = new Auth(conf.clientId, conf.clientSecret, callbackURL);

        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));


        // Redirects for the "home" page
        redirect.get("", "/");

        Route clientRoute = (req, res) -> {
            //Return client files

            InputStream stream = Server.class.getResourceAsStream("/public/index.html");
            if(null != stream){
                System.err.println("stream is not null");
                if(null != stream.toString()){
                    System.err.print(", and is ");
                    System.err.print(stream.toString());
                }
            } else{
                System.err.println("GASP, Stream is null");
            }
            return IOUtils.toString(stream);
        };

        //get("/", clientRoute);
        redirect.get("/", "http://localhost:9000");

        get("api/authorize", (req,res) -> {
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

        before(((request, response) -> {
            System.out.println("New request: " + request.pathInfo());
            if(!("/".equals(request.pathInfo()) || "/api/authorize".equals(request.pathInfo()) || "/callback".equals(request.pathInfo()))){
                System.out.println("Checking Auth");
                String cookie = request.cookie("cards.sage");
                System.out.println(cookie);

                if(!auth.authorized(cookie)) {
                    System.err.println("Auth denied");
                    response.redirect(auth.getAuthURL(publicURL + "/api/authorize"));
                }
            }
        }));

        /// Deck and Card Endpoints ///////////////////////////
        /////////////////////////////////////////////
        get("api/cards/:id", cardController::getCard);
        get("api/cards", cardController::getCards);
        get("api/decks", deckController::getDecks);
        post("api/decks/add", deckController::addNewDeck);
        get("api/decks/:id", deckController::getDeck);
        post("api/cards/add", cardController::addNewCard);
        post("api/addMany", cardController::addCardsToDeck);
        get("api/simple-cards", cardController::getSimpleCards);
        get("api/simple-decks", deckController::getSimpleDecks);
        get("api/classrooms", classroomController::getClassrooms);
        get("api/classroom:id", classroomController::getClassroom);
        get("api/users", userController::getUsers);
        get("api/user:id", userController::getUser);



        get("/callback", (req, res) -> {

            Map<String, String[]> params = req.queryMap().toMap();
            String[] states = params.get("state");
            String[] codes = params.get("code");
            String[] errors = params.get("error");
            if (null == states) {
                // we REQUIRE that we be passed a state
                halt(400);
                return ""; // never reached
            }
            if (null == codes ) {
                if (null == errors) {
                    // we don't have codes, but we don't have an error either, so this a garbage request
                    halt(400);
                    return ""; // never reached
                }
                else if ("access_denied".equals(errors[0])) {
                    // the user clicked "deny", so send them to the visitor page
                    res.redirect("/");
                    return ""; // send an empty body back on redirect
                }
                else {
                    // an unknown error was passed to us, so we halt
                    halt(400);
                    return ""; // not reached
                }
            }
            String state = states[0];
            String code = codes[0];
            try {
                String originatingURL = auth.verifyCallBack(state, code);
                if (null != originatingURL) {
                    Cookie c = auth.getCookie();
                    res.cookie(c.name, c.value, c.max_age);
                    System.err.println("Innermost Auth script was run");
                    res.redirect(originatingURL);
                    System.out.println("good");
                    return ""; // not reached
                } else {
                    System.out.println("bad");
                    res.status(403);
                    return "?????"; // todo: return a reasonable message
                }
            } catch (UnauthorizedUserException e) {
                res.redirect("/");
                return ""; // not reached
            }
//            res.type("application/json");
//            Map<String, String[]> params = req.queryMap().toMap();
//            String state = params.get("state")[0];
//            String code = params.get("code")[0];
//            System.err.println(req);
//            return auth.getProfile(state, code);
        });


        // Called after each request to insert the GZIP header into the response.
        // This causes the response to be compressed _if_ the client specified
        // in their request that they can accept compressed responses.
        // There's a similar "before" method that can be used to modify requests
        // before they they're processed by things like `get`.
        after("*", Server::addGzipHeader);

        get("/*", clientRoute);

        // Handle "404" file not found requests:
        notFound((req, res) -> {
            res.type("text");
            res.status(404);
            return "Sorry, we couldn't find that!";
        });


    }
    ///moved in here because Java is being weird.
    private class Conf {
        public String clientId;
        public String clientSecret;
        public String publicURL;
        public String callbackURL;
    }

    // Enable GZIP for all responses
    private static void addGzipHeader(Request request, Response response) {
        response.header("Content-Encoding", "gzip");
    }


}



