package umm3601.Authentication;

import com.mongodb.util.JSON;
import org.bson.Document;
import spark.Request;
import spark.Response;


public class AuthController {
    Auth auth;

    public Object checkAuthorization(Request request, Response response) {
//        String cookie = request.cookie("ddg");
//        System.out.println(cookie);
//
//        if (!auth.authorized(cookie)) {
//            System.out.println("AuthController: Auth failed");
//            return false;
//        } else {
//            System.out.println("AuthController: Auth passed");
//            return true;
//        }


        response.type("application/json");
        response.header("Cache-Control","no-cache, no-store, must-revalidate");
        System.out.println(request.cookie("ddg"));

        String cookie = request.cookie("ddg");
        Document returnDoc = new Document();
        returnDoc.append("authorized", auth.authorized(cookie));
        System.out.println(JSON.serialize(returnDoc));
        return JSON.serialize(returnDoc);
    };
}
