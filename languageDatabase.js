let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "languages.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite languages database.");
    db.run(
      `CREATE TABLE languages (
                  id INTEGER PRIMARY KEY,
                  name TEXT,
                  img TEXT,
                  alt TEXT,
                  link TEXT
                  )`,
      (err) => {
        if (err) {
          console.error("Language table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

const fillDatabase = (db) => {
  let insert = "INSERT INTO languages (name, img, alt, link) VALUES (?,?,?,?)";

  db.run(insert, [
    "Swedish",
    "http://localhost:3000/images/swedish-flag.png",
    "swedish flag",
    "/category",
  ]);
  db.run(insert, [
    "Spanish",
    "http://localhost:3000/images/spanish-flag.png",
    "spanish flag",
    "/category",
  ]);
  db.run(insert, [
    "French",
    "http://localhost:3000/images/french-flag.png",
    "french flag",
    "/category",
  ]);
  db.run(insert, [
    "Chinese",
    "http://localhost:3000/images/chinese-flag.png",
    "chinese flag",
    "/category",
  ]);
};

module.exports = db;
