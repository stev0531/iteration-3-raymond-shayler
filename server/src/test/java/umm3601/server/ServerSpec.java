package umm3601.server;
import org.junit.*;
import umm3601.Server;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;


public class ServerSpec {
    @Test
    public void testNeedsAuth(){
        Server server = new Server();
        //show that these paths need auth
        assertTrue(server.needsAuth("/api/cards/add"));
        assertTrue(server.needsAuth("/api/decks/add"));
        assertTrue(server.needsAuth("/api/addMany"));
        assertTrue(server.needsAuth("/api/deleteMany"));

        //ignore other paths
        assertFalse(server.needsAuth("/api/cards"));
        assertFalse(server.needsAuth("/api/simple-cards"));
        assertFalse(server.needsAuth("/api/decks"));
        assertFalse(server.needsAuth("/api/8122182"));
        //testing against a URL that should not exist
        assertFalse(server.needsAuth("/api/figs"));
    }
}
