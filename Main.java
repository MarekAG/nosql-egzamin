import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mongodb.*;

import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main( String args[] ) {

        try{

            MongoClient mongoClient = new MongoClient( "localhost" , 27017 );

            DB db = mongoClient.getDB( "nosql" );
            DBCollection coll = db.getCollection("terrorism");
            DBObject myDoc = coll.findOne();
            System.out.println(myDoc);

            DBObject match = new BasicDBObject("$match", new BasicDBObject("region", new BasicDBObject("$ne", "Unknown")));

            DBObject groupFields = new BasicDBObject( "_id", "$region");
            groupFields.put("region", new BasicDBObject("$first", "$region_txt"));
            groupFields.put("count", new BasicDBObject( "$sum", 1));
            DBObject group = new BasicDBObject("$group", groupFields );

            DBObject sortFields = new BasicDBObject("count", -1);
            DBObject sort = new BasicDBObject("$sort", sortFields );

            DBObject fields = new BasicDBObject("_id", 0);
            DBObject project = new BasicDBObject("$project", fields );

            List<DBObject> pipeline = new ArrayList();
            pipeline.add(match);
            pipeline.add(group);
            pipeline.add((sort));
            pipeline.add(project);

            AggregationOutput output = coll.aggregate(pipeline);


            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String json = gson.toJson(output.results());
            System.out.println(json);
        }catch(Exception e){
            System.err.print( e.getClass().getName() + ": " + e.getMessage() );
        }
    }
}
