let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "progress.db";

const fillDatabase = (db) => {
  let insert =
    "INSERT INTO progress (userID, language, category, progress) VALUES (?,?,?,?)";
  db.run(insert, [1, "swedish", "fruit", 10]);
  db.run(insert, [1, "swedish", "occupation", 30]);
  db.run(insert, [1, "swedish", "animal", 60]);
};

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
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
