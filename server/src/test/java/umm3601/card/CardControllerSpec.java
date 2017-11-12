package umm3601.card;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.json.JsonReader;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import umm3601.card.CardController;
import umm3601.deck.DeckController;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Projections;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;


public class CardControllerSpec {
    private DeckController deckController;
    private CardController cardController;
    private ObjectId testDeckId;

    private List<Document> testCards;
    private List<Document> moreTestCards;

    @Before
    public void clearAndPopulateDB() throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase db = mongoClient.getDatabase("i1-droptable-test");
        MongoCollection<Document> deckDocuments = db.getCollection("decks");
        MongoCollection<Document> cardDocuments = db.getCollection("cards");
        deckDocuments.drop();
        cardDocuments.drop();
        List<Document> testDecks = new ArrayList<>();
        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 1\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b6\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b7\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b8\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b9\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9ba\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bb\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bc\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bd\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9be\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9bf\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac25d47c9429bff9ba909\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9c0\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDecks.add(Document.parse("{\n" +
            "        \"name\": \"test deck 2\",\n" +
            "        \"cards\": [\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "            },\n" +
            "            {\n" +
            "                \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "            }\n" +
            "        ]\n" +
            "    }"
        ));

        testDeckId = new ObjectId();
        ObjectId[] cards = {new ObjectId("59dac7b147c9429bff9ba9b3"),
            new ObjectId("59dac7b147c9429bff9ba9b4"),
            new ObjectId("59dac7b147c9429bff9ba9b5")};
        BasicDBObject testDeck = new BasicDBObject("_id", testDeckId)
            .append("name", "test deck 3")
            .append("cards", cards);

        deckDocuments.insertMany(testDecks);
        deckDocuments.insertOne(Document.parse(testDeck.toJson()));

        testCards = new ArrayList<>();
        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b3\"\n" +
            "        },\n" +
            "        \"word\": \"Aesthetic reading\",\n" +
            "        \"synonym\": \"artistic\",\n" +
            "        \"antonym\": \"Efferant Reading\",\n" +
            "        \"general_sense\": \"a term to describe reading for pleasure\",\n" +
            "        \"example_usage\": \"A readers response that is driven by personal feelings from the transactionbetween the reader with text Louise Rosenblatt 1978 term\"\n" +
            "    }"));

        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b4\"\n" +
            "        },\n" +
            "        \"word\": \"Alliteration\",\n" +
            "        \"synonym\": \"allegory\",\n" +
            "        \"antonym\": \"free verse poetry\",\n" +
            "        \"general_sense\": \"repetition of the initial sound (s) or letters in a group of words.\",\n" +
            "        \"example_usage\": \"Often found in prose or poetry: Craig loved his fuzzy furry ferret.\"\n" +
            "    }"));

        testCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"59dac7b147c9429bff9ba9b5\"\n" +
            "        },\n" +
            "        \"word\": \"Pletora\",\n" +
            "        \"synonym\": \"Excess, plenty\",\n" +
            "        \"antonym\": \"Lack, scarcity, few\",\n" +
            "        \"general_sense\": \"overabundance\",\n" +
            "        \"example_usage\": \"There was a plethora of rubber duckies in the pool.\"\n" +
            "    }"));

        moreTestCards = new ArrayList<>();
        moreTestCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"507f191e810c19729de860ea\"\n" +
            "        },\n" +
            "        \"word\": \"Catalyst\",\n" +
            "        \"synonym\": \"Stimulus\",\n" +
            "        \"antonym\": \"Prevention\",\n" +
            "        \"general_sense\": \"Speeding up the action of something\",\n" +
            "        \"example_usage\": \"The dry weather acted as a catalyst for the forest fire.\"\n" +
            "    }"));

        moreTestCards.add(Document.parse("{\n" +
            "        \"_id\": {\n" +
            "            \"$oid\": \"1fe762ee78d8578716a8727c\"\n" +
            "        },\n" +
            "        \"word\": \"Verisimilitude\",\n" +
            "        \"synonym\": \"Realistic\",\n" +
            "        \"antonym\": \"Fake\",\n" +
            "        \"general_sense\": \"Having the appearance of being real\",\n" +
            "        \"example_usage\": \"The painting created a sense of verisimilitude because of its fine detail.\"\n" +
            "    }"));


        //  cardDocuments.insertMany(moreTestCards);
        cardDocuments.insertMany(testCards);
        cardDocuments.insertMany(moreTestCards);
        cardController = new CardController(db);
        deckController = new DeckController(db);
    }

    private BsonArray parseJsonArray(String json) {
        final CodecRegistry codecRegistry
            = CodecRegistries.fromProviders(Arrays.asList(
            new ValueCodecProvider(),
            new BsonValueCodecProvider(),
            new DocumentCodecProvider()));

        JsonReader reader = new JsonReader(json);
        BsonArrayCodec arrayReader = new BsonArrayCodec(codecRegistry);

        return arrayReader.decode(reader, DecoderContext.builder().build());
    }

    public List<String> getStringsFromBsonArray(BsonArray docs, String field) {
        return docs.stream()
            .map(x -> x.asDocument().getString(field).getValue())
            .sorted()
            .collect(Collectors.toList());
    }

    @Test
    public void getAllCards() {
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 cards", 3, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Pletora");
        assertEquals("Words should match", expectedWords, words);
    }

    @Test
    public void getCardById() {
        String jsonResult = cardController.getCard("59dac7b147c9429bff9ba9b3");
        Document testCard = Document.parse(jsonResult);
        assertEquals("Word should match", "Aesthetic reading", testCard.get("word"));
    }

    @Test
    public void addNewCard() {
        cardController.addNewCard(testDeckId.toHexString(), "Cool", "rad", "bogus",
            "something that is radical and stuff", "Todd is cool as heck");

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 4 cards", 4, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Cool", "Pletora");
        assertEquals("Words should match", expectedWords, words);
        // assertEquals("words should match", Arrays.asList("Aesthetic reading", "Alliteration", "Pletora", "Cool"),cards.stream().map(x -> x.getString("word")).collect(Collectors.toList()));
    }

    @Test
    public void addToDeck() {
        cardController.addNewCard(testDeckId.toHexString(), "Sweet", "cool", "lame",
            "something that is neat and stuff", "Angular is sweet");
        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 4 cards in the deck", 4, cards.size());
    }

    @Test
    public void tryAddWithNullParameters() {
        cardController.addNewCard(null, null, null, null, null, null);

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 cards", 3, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Pletora");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddWithEmptyStrings() {
        cardController.addNewCard("", "", "", "", "", "");

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 cards", 3, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Pletora");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddWithOneEmptyStrings() {
        cardController.addNewCard("deckID", "", "synonym", "antonym", "general", "example");

        Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult = cardController.getCards(emptyMap);
        BsonArray docs = parseJsonArray(jsonResult);

        assertEquals("Should be 3 cards", 3, docs.size());
        List<String> words = getStringsFromBsonArray(docs, "word");
        List<String> expectedWords = Arrays.asList("Aesthetic reading", "Alliteration", "Pletora");
        assertEquals("Words should match", expectedWords, words);

        // Map<String, String[]> emptyMap = new HashMap<>();
        String jsonResult2 = deckController.getDeck(testDeckId.toHexString());
        Document deck = Document.parse(jsonResult2);
        ArrayList<Document> cards = deck.get("cards", ArrayList.class);
        assertEquals("Should be 3 cards in the deck", 3, cards.size());
    }

    @Test
    public void tryAddingACardFromCardList() {
        String[] cardIds = {"507f191e810c19729de860ea"};
        cardController.addCardsToDeck(testDeckId.toString(), cardIds);

        String jsonResult = deckController.getDeck(testDeckId.toString());
        Document deckToAdd = Document.parse(jsonResult);
        ArrayList<Document> cardsToAdd = deckToAdd.get("cards", ArrayList.class);
        assertEquals("Should be 4 cards in the deck", 4, cardsToAdd.size());
    }

    @Test
    public void tryDeletingACardFromCardList() {
        String[] cardIds = {"59dac7b147c9429bff9ba9b4"};
        cardController.deleteCardsFromDeck(testDeckId.toString(), cardIds);

        cardController.deleteCardsFromDeck(testDeckId.toString(), cardIds);
        String jsonResult = deckController.getDeck(testDeckId.toString());
        Document deckToDelete = Document.parse(jsonResult);
        ArrayList<Document> cardsToDelete = deckToDelete.get("cards", ArrayList.class);
        assertEquals("Should be 2 cards in the deck", 2, cardsToDelete.size());
    }

    @Test
    public void tryAddingMultipleCardsFromCardList() {
        String[] cardIds = {"507f191e810c19729de860ea","1fe762ee78d8578716a8727c"};
        cardController.addCardsToDeck(testDeckId.toString(), cardIds);

        String jsonResult = deckController.getDeck(testDeckId.toString());
        Document deckToAdd = Document.parse(jsonResult);
        ArrayList<Document> cardsToAdd = deckToAdd.get("cards", ArrayList.class);
        assertEquals("Should be 5 cards in the deck", 5, cardsToAdd.size());
    }

    @Test
    public void tryDeletingMultipleCardsFromCardList() {
        String[] cardIds = {"59dac7b147c9429bff9ba9b3","59dac7b147c9429bff9ba9b4"};
        cardController.deleteCardsFromDeck(testDeckId.toString(), cardIds);

        String jsonResult = deckController.getDeck(testDeckId.toString());
        Document deckToAdd = Document.parse(jsonResult);
        ArrayList<Document> cardsToAdd = deckToAdd.get("cards", ArrayList.class);
        assertEquals("Should be 1 card in the deck", 1, cardsToAdd.size());
    }

}
