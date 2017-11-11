package umm3601;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.google.gson.*;
import org.bson.json.JsonReader;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.utils.IOUtils;

import umm3601.card.CardController;
import umm3601.deck.DeckController;
import umm3601.Auth;
import umm3601.Conf;

import java.io.*;
import java.util.Map;






import static spark.Spark.*;
import static spark.debug.DebugScreen.enableDebugScreen;

public class Server {
    private static final String databaseName = "i1-droptable-dev";
    private static final int serverPort = 4567;

    public static void main(String[] args) throws IOException {

        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase(databaseName);

        CardController cardController = new CardController(database);

        DeckController deckController = new DeckController(database);

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
        com.google.gson.stream.JsonReader reader =
            new com.google.gson.stream.JsonReader(new FileReader("/config.json"));
        Gson gson = new Gson();
        Conf conf = gson.fromJson(reader, Conf.class);
        Auth auth = new Auth(conf.clientId, conf.clientSecret);

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
            return IOUtils.toString(stream);
        };

        get("/", clientRoute);

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

        //auth test
        get("api/authTest", ((request, response) -> {
            response.type("text/plain");
            response.redirect(auth.getAuthURL());

            return response;
        }));

        get("callback", (req, res) -> {
            res.type("application/json");
            Map<String, String[]> params = req.queryMap().toMap();
            String state = params.get("state")[0];
            String code = params.get("code")[0];
            return auth.getProfile(state, code);
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

    // Enable GZIP for all responses
    private static void addGzipHeader(Request request, Response response) {
        response.header("Content-Encoding", "gzip");
    }
}
