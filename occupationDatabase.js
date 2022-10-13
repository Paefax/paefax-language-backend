let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "occupation.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO occupation (english, swedish) VALUES (?,?)";
  db.run(insert, ["Lawyer", "Advokat"]);
  db.run(insert, ["Architect", "Arkitekt"]);
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite occupation database.");
    db.run(
      `CREATE TABLE occupation (
            id INTEGER PRIMARY KEY,
            english TEXT,
            swedish TEXT
            )`,
      (err) => {
        if (err) {
          console.error("Occupation table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
