import { MongoClient } from 'mongodb';
import { consoleLogColor } from './internalDebuggingFunctions.js';
var url = "mongodb://localhost:27017/";

/**
 * Queries the MongoDB for users with existing reservations;  
 * If the user has an entry it prints a console log message with that user's name;  
 * If the user does not have an entry in the db, the callback function will execute;
 * 
 * @param {String}          dbName         The name of the database to verify.
 * @param {String}          collectionName The name of the collection to verify.
 * @param {String}          userName       The name of the user to query the database with.
 * @param {function():void} callback       Callback to run if the user does not already have an entry in the database.
 */
function checkUserReservations(dbName, collectionName, userName, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myQuery = { name: userName };
    dbo.collection(collectionName).findOne(myQuery, function (err, result) {
      if (err) throw err;
      if (result != null) {
        // TODO add timestamp
        // LEARN why the following console.log prints: 'MongoDB: WARNundefined undefined'
        // console.log(consoleLogColor("MongoDB: ", "green"), consoleLogColor("WARN", "yellow"));
        // LEARN why the following console.log prints: 'MongoDB: WARNNaN'
        // console.log(consoleLogColor("MongoDB: ", "green") + consoleLogColor("WARN", "yellow"));
        consoleLogColor("MongoDB: ", "green");
        consoleLogColor("WARN", "yellow");
        console.log("\n", userName, "tried to make a reservation but already has an entry in db:\n", result, "\n");
        db.close();
      } else {
        /* pass the database to the callback, it will be closed by callback function */
        callback(db);
      }
    });
  });
}

/* TODO add function description */
function mongoDbAddReservationIfNotExists(db, dbName, collectionName, deskNr, userName, userColor) {
  var dbo = db.db(dbName);
  const timestamp = Date.now();
  const currentDate = Date(timestamp);
  var myobj = { desk: "Desk " + deskNr, name: userName, color: userColor, date: currentDate };
  dbo.collection(collectionName).insertOne(myobj, function (err, _result) {
    if (err) throw err;
    // TODO add timestamp
    consoleLogColor("MongoDB: ", "green");
    consoleLogColor("INFO", "blue");
    console.log("\n", userName, "created a reservation, 1 document inserted in db:\n", myobj, "\n");

    /* close the database passed as a parameter */
    db.close();
  });
}

/* TODO add function description */
export function mongoDbAddReservation(dbName, collectionName, deskNr, userName, userColor) {
  checkUserReservations(dbName, collectionName, userName, (database) => {
    mongoDbAddReservationIfNotExists(database, dbName, collectionName, deskNr, userName, userColor);
  });
}