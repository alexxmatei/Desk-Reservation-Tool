import { MongoClient } from 'mongodb';
import { ConsoleMessage } from './consoleLogFunctions.js';
const DB_URL = "mongodb://localhost:27017/";

/**
 * Queries the MongoDB for users with existing reservations.  
 * If the user has an entry it prints a console log message with that user's name.  
 * If the user does not have an entry in the db, the callback function will execute.
 * 
 * @param {String}          dbName         The name of the database to verify.
 * @param {String}          collectionName The name of the collection to verify.
 * @param {String}          userName       The name of the user to query the database with.
 * @param {function():void} callback       Callback to run if the user does not already have an entry in the database.
 */
function checkUserReservations(dbName, collectionName, userName, callback) {
  MongoClient.connect(DB_URL, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    let dbo = db.db(dbName);
    let myQuery = { name: userName };
    dbo.collection(collectionName).findOne(myQuery, function (err, result) {
      if (err) throw err;
      if (result != null) {
        // LEARN why the following console.log prints: 'MongoDB: WARNundefined undefined'
        // console.log(consoleLogColor("MongoDB: ", "green"), consoleLogColor("WARN", "yellow"));
        // LEARN why the following console.log prints: 'MongoDB: WARNNaN'
        // console.log(consoleLogColor("MongoDB: ", "green") + consoleLogColor("WARN", "yellow"));
        let l_logMessage_s = userName + " tried to make a reservation but already has an entry in db:\n" + JSON.stringify(result, null, ' ') + "\n";
        new ConsoleMessage(l_logMessage_s).printMongoWarning();
        db.close();
      } else {
        /* pass the database to the callback, it will be closed by callback function */
        callback(db);
      }
    });
  });
}

/**
 * Create a reservation, a database entry based on the data passed to function and a generated timestamp.  
 * Intended to be used internally as a callback to function `checkUserReservations`.  
 * Function is only called if the user requesting a reservation does not have a database entry associated.  
 * 
 * @param {MongoClient} db             MongoDB client opened connection object.
 * @param {String}      dbName         The name of the database to create an entry in.
 * @param {String}      collectionName The name of the collection to create an entry in.
 * @param {Number}      deskNr         The desk number to be added in reservation.
 * @param {String}      userName       The name of the user to be added in reservation.
 * @param {String}      userColor      The preferred desk color of the user to be added in reservation.
 */
function mongoDbAddReservationIfNotExists(db, dbName, collectionName, deskNr, userName, userColor) {
  let dbo = db.db(dbName);
  /* create a date with the current date-time in a human readable format */
  let currentDate = new Date().toString("en-GB");
  /* remove the time zone specified at the end of the string */
  currentDate = currentDate.slice(0, 24);

  let myobj = { desk: "Desk " + deskNr, name: userName, color: userColor, date: currentDate };
  dbo.collection(collectionName).insertOne(myobj, function (err, _result) {
    if (err) throw err;
    let l_logMessage_s = userName + " created a reservation, 1 document inserted in db:\n" + JSON.stringify(myobj, null, ' ') + "\n";
    new ConsoleMessage(l_logMessage_s).printMongoInfo();
    /* close the database passed as a parameter */
    db.close();
  });
}

/**
 * Add a reservation if one does not exist for this user.  
 * Entry added will be based on the parameters passed to the function and a generated timestamp at the moment of creation.  
 * Print the result of the operation to console.
 * 
 * @param {String} dbName         The name of the database to create an entry in.
 * @param {String} collectionName The name of the collection to create an entry in.
 * @param {Number} deskNr         The desk number to be added in reservation.
 * @param {String} userName       The name of the user to be added in reservation.
 * @param {String} userColor      The preferred desk color of the user to be added in reservation.
 */
export function mongoDbAddReservation(dbName, collectionName, deskNr, userName, userColor) {
  checkUserReservations(dbName, collectionName, userName, (database) => {
    mongoDbAddReservationIfNotExists(database, dbName, collectionName, deskNr, userName, userColor);
  });
}