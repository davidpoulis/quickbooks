let mongoClient = require("mongodb").MongoClient;

let db = "mongodb+srv://earlybreakfast-local:vjQMe50CMDB0mBYA@cluster0-tf6jt.mongodb.net/quickbooks?retryWrites=true";
  function connect(callback){
      mongoClient.connect(db, function (error, client) {
        if (error) {
            console.log("Error while connecting to database: ", error);
        } else {
            var db = client.db('quickbooks')
            var collection = db.collection('bearerToken')
            collection.find().toArray((err, items) => {
               let accessToken = items[0].accessToken;
               let realmId = items[0].realmId
                callback(accessToken,realmId) 
            });
    
        }
    
    });
}


exports.connect = connect;