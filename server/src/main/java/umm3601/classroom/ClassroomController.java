package umm3601.classroom;

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

public class ClassroomController {
    private final Gson gson;
    private MongoDatabase database;
    private final MongoCollection<Document> classroomCollection;


    public ClassroomController(MongoDatabase database){
        gson = new Gson();
        this.database = database;
        classroomCollection = database.getCollection("classrooms");
    }

    public String getClassroom(Request req, Response res){
        res.type("application/json");
        String id = req.params("id");
        String classroom;
        try {
            classroom = getClassroom(id);
        }
        catch (IllegalArgumentException e){
            res.status(400);
            res.body("The requested user id " + id + " wasn't a legal Mongo Object ID.\n" +
                "See 'https://docs.mongodb.com/manual/reference/method/ObjectId/' for more info.");
            return "";
        }

        if(classroom != null){
            return classroom;
        }
        else {
            res.status(404);
            res.body("The requested deck with id " + id + " was not found");
        }
        return null;
    }


    public String getClassroom(String id){
        AggregateIterable<Document> deck = classroomCollection.aggregate(Arrays.asList(
            Aggregates.match(new Document("_id", new ObjectId(id))),
            Aggregates.lookup("classrooms", "classrooms", "_id", "classrooms")
        ));

        return deck.first().toJson();
    }

    public String getClassrooms(Request req, Response res){
        res.type("application/json");
        return getClassrooms(req.queryMap().toMap());
    }

    public String getClassrooms(Map<String, String[]> queryParams){
        Document filterDoc = new Document();
        if (queryParams.containsKey("name")){
            String  targetName = queryParams.get("name")[0];
            filterDoc = filterDoc.append("name", targetName);
        }

        AggregateIterable<Document> classrooms = classroomCollection.aggregate(Arrays.asList(
            Aggregates.match(filterDoc),
            Aggregates.project(Projections.fields(
                Projections.include("name")
             //   Projections.computed("count", new Document("$size", "$cards"))
            ))
        ));

        return JSON.serialize(classrooms);
    }


}
