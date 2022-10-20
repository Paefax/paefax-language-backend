let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "users.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite user database.");
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT            
            )`,
      (err) => {
        if (err) {
          console.error("User table already created");
        }
      }
    );
  }
});

module.exports = db;