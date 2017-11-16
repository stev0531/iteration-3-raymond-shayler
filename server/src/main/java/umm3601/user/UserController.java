package umm3601.user;

import com.google.gson.Gson;
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
import java.util.Map;

public class UserController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> userCollection;


    public UserController(MongoDatabase database){
        gson = new Gson();
        this.database = database;
        userCollection = database.getCollection("users");
    }

    public String getUser(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String user;
        try {
            user = getUser(id);
        }
        catch (IllegalArgumentException e){
            res.status(400);
            res.body("The requested user id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }

        if(user != null){
            return user;
        }
        else {
            res.status(404);
            res.body("The requested user with id " + id + " was not found");
        }
        return null;
    }


    public String getUser(String id){
        AggregateIterable<Document> deck = userCollection.aggregate(Arrays.asList(
            Aggregates.match(new Document("_id", new ObjectId(id))),
            Aggregates.lookup("users", "users", "_id", "users")
        ));

        return deck.first().toJson();
    }

    public String getUsers(Request req, Response res){
        res.type("application/json");
        return getUsers(req.queryMap().toMap());
    }

    public String getUsers(Map<String, String[]> queryParams){
        Document filterDoc = new Document();
        if (queryParams.containsKey("name")){
            String  targetName = queryParams.get("name")[0];
            filterDoc = filterDoc.append("name", targetName);
        }

        AggregateIterable<Document> classrooms = userCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDoc),
            Aggregates.project(Projections.fields(
                Projections.include("name")
            ))
        ));

        return JSON.serialize(classrooms);
    }
}
