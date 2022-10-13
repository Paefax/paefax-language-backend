let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "fruit.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO fruit (english, swedish) VALUES (?,?)";
  db.run(insert, ["Pineapple", "Ananas"]);
  db.run(insert, ["Orange", "Apelsin"]);
  db.run(insert, ["Apricot", "Aprikos"]);
  db.run(insert, ["Avocado", "Avokado"]);
  db.run(insert, ["Banana", "Banan"]);
  db.run(insert, ["Blackberry", "Björnbär"]);
  db.run(insert, ["Blueberry", "Blåbär"]);
  db.run(insert, ["Lemon", "Citron"]);
  db.run(insert, ["Clementine", "Clementin"]);
  db.run(insert, ["Fig", "Fikon"]);
  db.run(insert, ["Grapefruit", "Grapefrukt"]);
  db.run(insert, ["Raspberry", "Hallon"]);
  db.run(insert, ["Strawberry", "Jordgubbe"]);
  db.run(insert, ["Kiwifruit", "Kiwi"]);
  db.run(insert, ["Coconut", "Kokosnöt"]);
  db.run(insert, ["Grape", "Vindruva"]);
  db.run(insert, ["Watermelon", "Vattenmelon"]);
  db.run(insert, ["Blackcurrant", "Svart Vinbär"]);
  db.run(insert, ["Raisin", "Russin"]);
  db.run(insert, ["Redcurrant", "Rött Vinbär"]);
  db.run(insert, ["Pear", "Päron"]);
  db.run(insert, ["Plum", "Plommon"]);
  db.run(insert, ["Peach", "Persika"]);
  db.run(insert, ["Olive", "Oliver"]);
  db.run(insert, ["Nectarin", "Nektarin"]);
  db.run(insert, ["Melon", "Melon"]);
  db.run(insert, ["Mango", "Mango"]);
  db.run(insert, ["Mandarin", "Mandarin"]);
  db.run(insert, ["Lime", "Lime"]);
  db.run(insert, ["Cherry", "Körsbär"]);
  db.run(insert, ["Gooseberry", "Krusbär"]);
  db.run(insert, ["Apple", "Äpple"]);
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
