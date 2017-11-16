package umm3601.Authentication;

public class GoogleJwtBody {

    // useful
    public Boolean email_verified;
    public String email;

    // maybe useful
    public String iss;
    public String hd;
    public long exp;
    public String iat;

    // ??
    public String at_hash;
    public String aud;
    public String sub;
}
