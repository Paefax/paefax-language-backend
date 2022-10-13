let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "animal.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO animal (english, swedish) VALUES (?,?)";
  db.run(insert, ["Monkey", "Apa"]);
  db.run(insert, ["Bee", "Bi"]);
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite animal database.");
    db.run(
      `CREATE TABLE animal (
            id INTEGER PRIMARY KEY,
            english TEXT,
            swedish TEXT
            )`,
      (err) => {
        if (err) {
          console.error("Animal table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
