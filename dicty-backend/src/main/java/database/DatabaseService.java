package database;


import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoDatabase;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;

/**
 * Created by Vovan on 06.11.2016.
 */
public class DatabaseService {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseService.class);

    private static Datastore datastore;

    public static Datastore getDatabase() {
        if (datastore == null) {
            logger.info("Database connector initialization");
            MongoCredential credential = MongoCredential.createCredential("test", "dbtest", "test".toCharArray());
            MongoClient mongoClient = new MongoClient(new ServerAddress("ds033607.mlab.com", 33607), Arrays.asList(credential));

            Morphia morphia = new Morphia();
            morphia.mapPackage("entities");

            datastore = morphia.createDatastore(mongoClient, "dbtest");
        }
        return datastore;
    }
}
