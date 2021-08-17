import { MongoClient } from 'mongodb';
import { ConsoleMessage } from './consoleLogFunctions.js';
import { NUMBER_OF_DESKS } from './constants.js';
const DB_URL = "mongodb://localhost:27017/";

/**
 * Queries the MongoDB for users with existing reservations.  
 * If the user has an entry it prints a console log warning message with that user's name.  
 * If the user does not have an entry in the db, the callback function will execute.
 * 
 * @param {String}          dbName         The name of the database to verify.
 * @param {String}          collectionName The name of the collection to verify.
 * @param {String}          userName       The name of the user to query the database with.
 * @param {function():void} callback       Callback to run if the user does not already have an entry in the database.
 */
function checkIfUserDoesNotExist(dbName, collectionName, userName, callback) {
  MongoClient.connect(DB_URL, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    const myQuery = { name: userName };
    dbo.collection(collectionName).findOne(myQuery, function (err, result) {
      if (err) throw err;
      if (result != null) {
        // LEARN why the following console.log prints: 'MongoDB: WARNundefined undefined'
        // console.log(consoleLogColor("MongoDB: ", "green"), consoleLogColor("WARN", "yellow"));
        // LEARN why the following console.log prints: 'MongoDB: WARNNaN'
        // console.log(consoleLogColor("MongoDB: ", "green") + consoleLogColor("WARN", "yellow"));
        const l_logMessage_s = userName + " tried to make a reservation but already has an entry in db:\n" + JSON.stringify(result, null, ' ') + "\n";
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
 * Intended to be used internally as a callback to function `checkIfUserDoesNotExist`.  
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
  const dbo = db.db(dbName);
  /* create a date with the current date-time in a human readable format */
  let currentDate = new Date().toString("en-GB");
  /* remove the time zone specified at the end of the string */
  currentDate = currentDate.slice(0, 24);

  const myObj = { desk: "Desk " + deskNr, name: userName, color: userColor, date: currentDate };
  dbo.collection(collectionName).insertOne(myObj, function (err, _result) {
    if (err) throw err;
    const l_logMessage_s = userName + " created a reservation, 1 document inserted in db:\n" + JSON.stringify(myObj, null, ' ') + "\n";
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
  checkIfUserDoesNotExist(dbName, collectionName, userName, (database) => {
    mongoDbAddReservationIfNotExists(database, dbName, collectionName, deskNr, userName, userColor);
  });
}

export const DESK_FREE = 0;
export const DESK_RESERVED = 1;
export const DESK_FIXED = 2;

// TODO Add JSDoc
export function getReservationStatusOfDesks(dbName, collectionName, callback) {
  let desk = {
    status: [],
    reservation: {
      user: [],
      color: []
    }
  }

  /* go through all the desks */
  for (let deskNr = 0; deskNr < NUMBER_OF_DESKS; deskNr++) {
    // LEARN Why this line doesn't work outside of for loop (program crashes eventually)
    MongoClient.connect(DB_URL, { useUnifiedTopology: true }, (err, db) => {
      if (err) throw err;
      const dbo = db.db(dbName);
      const query = { desk: "Desk " + (deskNr + 1) };
      dbo.collection(collectionName).findOne(query, (err, result) => {
        if (err) throw err;
        if (result == null) {
          /* if we don't have a result then desk is not occupied */
          desk.status[deskNr] = DESK_FREE;
        } else {
          desk.reservation.user[deskNr] = result.name;
          desk.reservation.color[deskNr] = result.color;
          if (result.fixed == true) {
            desk.status[deskNr] = DESK_FIXED;
          } else {
            desk.status[deskNr] = DESK_RESERVED;
          }
        }
        db.close();
        /* after the last deck is verified */
        if (deskNr == NUMBER_OF_DESKS - 1) {
          callback(desk);
        }
      });
    });
  }


}
