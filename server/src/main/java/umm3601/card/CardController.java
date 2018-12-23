package umm3601.card;

import com.google.gson.Gson;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoException;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Projections;
import com.mongodb.util.JSON;
import org.bson.Document;
import org.bson.types.ObjectId;
import spark.Request;
import spark.Response;
import umm3601.deck.DeckController;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

import static com.mongodb.client.model.Filters.eq;

public class CardController {

    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> cardCollection;
    private final MongoCollection<Document> deckCollection;

    public CardController(MongoDatabase database) {
        gson = new Gson();
        this.database = database;
        cardCollection = database.getCollection("cards");
        deckCollection = database.getCollection("decks");
    }

    public String getCard(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String deck;
        try {
            deck = getCard(id);
        }
        catch (IllegalArgumentException e){
            res.status(400);
            res.body("The requested card id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }

        if(deck != null){
            return deck;
        }
        else {
            res.status(404);
            res.body("The requested card with id " + id + " was not found");
        }
        return null;
    }

    public String getCard(String id){
        Iterable<Document> jsonCards
            = cardCollection
            .find(eq("_id", new ObjectId(id)));
        Iterator<Document> iterator = jsonCards.iterator();
        if (iterator.hasNext()) {
            Document card = iterator.next();
            return card.toJson();
        } else {
            // We didn't find the desired deck
            return null;
        }
    }

    public String getCards(Request req, Response res){
        res.type("application/json");
        return getCards(req.queryMap().toMap());
    }

    public String getCards(Map<String, String[]> queryParams){
        AggregateIterable<Document> cards = cardCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDocContainWord(queryParams)),
            Aggregates.project(Projections.fields(
                Projections.include("word"),
                Projections.include("synonym"),
                Projections.include("antonym"),
                Projections.include("general_sense"),
                Projections.include("example_usage")

            ))
        ));

        return JSON.serialize(cards);
    }

    public String getSimpleCards(Map<String, String[]> queryParams){
        AggregateIterable<Document> cards = cardCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDocContainWord(queryParams)),
            Aggregates.project(Projections.fields(
                Projections.include("_id"),
                Projections.include("word")
            ))
        ));

        return JSON.serialize(cards);
    }

    private Document filterDocContainWord(Map<String, String[]> queryParams){
        Document filterDoc = new Document();
        if (queryParams.containsKey("word")){
            String  targetWord = queryParams.get("word")[0];
            filterDoc = filterDoc.append("word", targetWord);
        }
        return filterDoc;
    }

    private String[] writeCardId(BasicDBObject dbO){
        BasicDBList dbIdList = (BasicDBList) dbO.get("cardIds");
        String[] cardIds = new String[dbIdList.size()];

        for (int i = 0; i < dbIdList.size(); i++) {
            cardIds[i] = dbIdList.get(i).toString();
        }

        return cardIds;
    }

    private String writeDeckId(BasicDBObject dbO){
        String deckID = dbO.getString("deckId");
        return deckID;
    }

    public Object addCardsToDeck(Request req, Response res) {
        System.out.println("This should print");
        try {
            PrintWriter pw = new PrintWriter(new FileWriter("/tmp/logs.txt"));
            pw.println("In addCardsToDeck");
            pw.close();
        } catch (IOException e) {

        }

        res.type("application/json");
        Object o = JSON.parse(req.body());
        return addCardsToDeck(o);
    }

    private Object addCardsToDeck(Object o){
        try {
            if (o.getClass().equals(BasicDBObject.class)) {
                return tryAddCardsToDeck(o);
            } else {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return false;
            }
        } catch (RuntimeException ree) {
            ree.printStackTrace();
            return false;
        }
    }

    private Object tryAddCardsToDeck(Object o){
        try {
            BasicDBObject dbO = (BasicDBObject) o;

            String deckID = writeDeckId(dbO);
            String[] cardIds = writeCardId(dbO);

            System.err.println("Adding new cards to " + deckID + " " + cardIds);
            return addCardsToDeck(deckID, cardIds);
        } catch (NullPointerException e) {
            System.err.println("A value was malformed or omitted, card addition request failed.");
            return false;
        }
    }

    public boolean addCardsToDeck(String deckID, String[] cardIds){
        try {
            PrintWriter fw = new PrintWriter(new FileWriter("logs.txt"));
            fw.println(deckID);
            fw.println(new ObjectId(deckID));
            fw.close();
        } catch (IOException e) {

        }

        for (int i = 0; i < cardIds.length; i++) {
                deckCollection.updateOne(new Document("_id", new ObjectId(deckID)), new Document("$push", new Document("cards", new ObjectId(cardIds[i]))));

        }
            return true;
        }

    public Object deleteCardsFromDeck(Request req, Response res) {
        System.out.println("This should print");

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if (o.getClass().equals(BasicDBObject.class)) {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;
                    String deckID = writeDeckId(dbO);
                    String[] cardIds = writeCardId(dbO);

                    System.err.println("Deleting cards from " + deckID + " " + cardIds[0]);
                    return deleteCardsFromDeck(deckID, cardIds);
                } catch (NullPointerException e) {
                    System.err.println("A value was malformed or omitted, card addition request failed.");
                    return false;
                }
            } else {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return false;
            }
        } catch (RuntimeException ree) {
            ree.printStackTrace();
            return false;
        }
    }

    public boolean deleteCardsFromDeck(String deckID, String[] cardIds){
        System.out.println("This should print");
        System.out.println(cardIds.length);
        for (int i = 0; i < cardIds.length; i++) {
            boolean deckContainsCard = (deckCollection.count(Filters.all("cards", cardIds[i])) == 1);
            // try {
          //  if (deckContainsCard) {
          //      System.out.println(deckContainsCard);
                deckCollection.updateOne(new Document("_id", new ObjectId(deckID)), new Document("$pull", new Document("cards", new ObjectId(cardIds[i]))));
            /* }  catch (MongoException me) {
                me.printStackTrace();
                return false;
            } */
          //  }
        }
        return true;
    }

    public Object addNewCard(Request req, Response res)
    {
        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if(o.getClass().equals(BasicDBObject.class))
            {
                return addNewCard(o,res);
            }
            else
            {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return false;
            }
        }
        catch(RuntimeException ree)
        {
            ree.printStackTrace();
            return false;
        }

    }

    private Object addNewCard(Object o, Response res){
        try {
            BasicDBObject dbO = (BasicDBObject) o;
            String deckID = dbO.getString("deckID");
            String word = dbO.getString("word");
            String synonym = dbO.getString("synonym");
            String antonym = dbO.getString("antonym");
            String general_sense = dbO.getString("general_sense");
            String example_usage = dbO.getString("example_usage");

            Document newCard = addNewCard(deckID, word, synonym, antonym, general_sense, example_usage);
            if (newCard != null) {
                return newCard.toJson();
            } else {
                res.status(400);
                res.body("The requested new card is missing one or more objects");
                return false;
            }


        }
        catch(NullPointerException e)
        {
            System.err.println("A value was malformed or omitted, new card request failed.");
            return false;
        }
    }

    public Document addNewCard(String deckID, String word, String synonym, String antonym, String general_sense, String example_usage){

        if (deckID == null || word == null || synonym == null || antonym == null || general_sense == null || example_usage == null) {
            return null;
        }
        if (deckID.equals("") || word.equals("") || synonym.equals("") || antonym.equals("") || general_sense.equals("") || example_usage.equals("")) {
            return null;
        }
        Document newCard = new Document();
        ObjectId newID = new ObjectId();

        newCard.append("_id", newID);
        newCard.append("word", word);
        newCard.append("synonym", synonym);
        newCard.append("antonym", antonym);
        newCard.append("general_sense", general_sense);
        newCard.append("example_usage", example_usage);
        try{
            cardCollection.insertOne(newCard);
            deckCollection.updateOne(new Document("_id", new ObjectId(deckID)), new Document("$push", new Document("cards", newID)));
        }
        catch(MongoException me){
            me.printStackTrace();
            return null;
        }

        return newCard;
    }

    public String getSimpleCards(Request req, Response res){
        res.type("application/json");
        return getSimpleCards(req.queryMap().toMap());
    }



    public Object deleteCard(Request req, Response res) {
        System.out.println("This should print");

        res.type("application/json");
        Object o = JSON.parse(req.body());
        try {
            if (o.getClass().equals(BasicDBObject.class)) {
                try {
                    BasicDBObject dbO = (BasicDBObject) o;
                    String cardID = dbO.getString("id");

                    return deleteCard(cardID);
                } catch (NullPointerException e) {
                    System.err.println("A value was malformed or omitted, deck update request failed.");
                    return false;
                }
            } else {
                System.err.println("Expected BasicDBObject, received " + o.getClass());
                return false;
            }
        } catch (RuntimeException ree) {
            ree.printStackTrace();
            return false;
        }
    }

    public boolean deleteCard(String cardId){
        System.out.print(cardId + "this looks null");
        System.err.print(cardId);
        cardCollection.deleteOne(new Document("_id", new ObjectId(cardId)));
        return true;
    }




}
