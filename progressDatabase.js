let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "progress.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite progress database.");
    db.run(
      `CREATE TABLE progress (
            id INTEGER PRIMARY KEY,
            userId INTEGER,
            language TEXT,
            category TEXT,
            progress INTEGER
            )`,
      (err) => {
        if (err) {
          console.error("Progress table already created");
        } else {
        }
      }
    );
  }
});

module.exports = db;
