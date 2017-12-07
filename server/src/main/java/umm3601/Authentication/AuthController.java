package umm3601.Authentication;

import com.mongodb.util.JSON;
import org.bson.Document;
import spark.Request;
import spark.Response;


public class AuthController {
    Auth auth;
    boolean USEAUTH;

    public void setAuth(Auth auth, Boolean USEAUTH) {
        this.auth = auth;

    }

    public Object checkAuthorization(Request request, Response response) {
        response.type("application/json");
        response.header("Cache-Control","no-cache, no-store, must-revalidate");
        System.out.println(request.cookie("ddg"));

        String cookie = request.cookie("ddg");
        Document returnDoc = new Document();
        System.out.println("cookie says it is " + auth.authorized(cookie));
        if(USEAUTH) {
            returnDoc.append("authorized", auth.authorized(cookie));
        } else{
            returnDoc.append("authorized", true);
        }
        System.out.println(JSON.serialize(returnDoc));
        return JSON.serialize(returnDoc);
    };
}
