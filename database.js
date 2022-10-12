var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "fruit.db";

const fillDatabase = (db) => {
  var insert = "INSERT INTO fruit (english, swedish) VALUES (?,?)";
  db.run(insert, ["apple", "äpple"]);
  db.run(insert, ["banana", "banan"]);
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite database.");
    db.run(
      `CREATE TABLE fruit (
            id INTEGER PRIMARY KEY,
            english TEXT,
            swedish TEXT
            )`,
      (err) => {
        if (err) {
          console.error("Table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
