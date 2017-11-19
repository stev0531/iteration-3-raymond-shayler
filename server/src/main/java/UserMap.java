import java.util.HashMap;

public class UserMap {
    public static HashMap<String, String> classRoomHashmap = new HashMap<>();

    public static void addUser(String user, String classroom)
    {
        classRoomHashmap.put(user, classroom);
    }

    public static void removeUser(String user)
    public static String getClassroom(String user){
        return classRoomHashmap.get(user);
    }
}
