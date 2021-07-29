import { MongoClient } from 'mongodb';
var url = "mongodb://localhost:27017/";

/**
 * Queries the MongoDB for users with existing reservations;  
 * If the user has an entry it prints a console log message with that user's name;  
 * If the user does not have an entry in the db, the callback function will execute;
 * 
 * @param {String} dbName The name of the database.
 * @param {String} collectionName The name of the collection.
 * @param {String} userName The name of the user.
 * @param {function():void} callback Callback to run if the user does not already have an entry in the database
 */
function checkUserReservations(dbName, collectionName, userName, callback) {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myQuery = { name: userName };
    dbo.collection(collectionName).findOne(myQuery, function (err, result) {
      if (err) throw err;
      if (result != null) {
        console.log(userName, "tried to make a reservation but already has an entry in db:\n", result);
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
    console.log("1 document inserted in db:\n", myobj);
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