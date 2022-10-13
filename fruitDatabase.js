let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "fruit.db";

const fillDatabase = (db) => {
  let insert =
    "INSERT INTO fruit (english, swedish, spanish, german) VALUES (?,?,?,?)";
  db.run(insert, ["Pineapple", "Ananas", "Piña", "Ananas"]);
  db.run(insert, ["Orange", "Apelsin", "Naranja", "Apfelsine"]);
  db.run(insert, ["Apricot", "Aprikos", "Albaricoque", "Aprikose"]);
  db.run(insert, ["Avocado", "Avokado", "Palta", "Avocado"]);
  db.run(insert, ["Banana", "Banan", "Plátano", "Banane"]);
  db.run(insert, ["Blackberry", "Björnbär", "Mora", "Brombeere"]);
  db.run(insert, ["Blueberry", "Blåbär", "Arándano", "Blaubeere"]);
  db.run(insert, ["Lemon", "Citron", "Limón", "Zitrone"]);
  db.run(insert, ["Clementine", "Clementin", "Clementina", "Clementine"]);
  db.run(insert, ["Fig", "Fikon", "Higo", "Feige"]);
  db.run(insert, ["Grapefruit", "Grapefrukt", "Toronja", "Grapefruit"]);
  db.run(insert, ["Raspberry", "Hallon", "Frambuesa", "Himbeere"]);
  db.run(insert, ["Strawberry", "Jordgubbe", "Fresa", "Erdbeere"]);
  db.run(insert, ["Kiwifruit", "Kiwi", "Kiwi", "Kiwi"]);
  db.run(insert, ["Coconut", "Kokosnöt", "Coco", "Kokosnuss"]);
  db.run(insert, ["Grape", "Vindruva", "Uva", "Traube"]);
  db.run(insert, ["Watermelon", "Vattenmelon", "Sandía", "Wassermelone"]);
  db.run(insert, [
    "Blackcurrant",
    "Svart Vinbär",
    "Grosella negra",
    "Schwarze Johannisbeere",
  ]);
  db.run(insert, ["Raisin", "Russin", "Pasa", "Rosine"]);
  db.run(insert, [
    "Redcurrant",
    "Rött Vinbär",
    "Grosella",
    "Rote Johannisbeere",
  ]);
  db.run(insert, ["Pear", "Päron", "Pera", "Birne"]);
  db.run(insert, ["Plum", "Plommon", "Ciruela", "Pflaume"]);
  db.run(insert, ["Peach", "Persika", "Durazno", "Pfirsich"]);
  db.run(insert, ["Olive", "Oliver", "Aceituna", "Olive"]);
  db.run(insert, ["Nectarin", "Nektarin", "Nectarina", "Nektarine"]);
  db.run(insert, ["Melon", "Melon", "Melón", "Melone"]);
  db.run(insert, ["Mango", "Mango", "Mango", "Mango"]);
  db.run(insert, ["Mandarin", "Mandarin", "Mandarín", "Mandarin"]);
  db.run(insert, ["Lime", "Lime", "Lima", "Limette"]);
  db.run(insert, ["Cherry", "Körsbär", "Cereza", "Kirsche"]);
  db.run(insert, ["Gooseberry", "Krusbär", "Grosella", "Stachelbeere"]);
  db.run(insert, ["Apple", "Äpple", "Manzana", "Apfel"]);
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite fruit database.");
    db.run(
      `CREATE TABLE fruit (
            id INTEGER PRIMARY KEY,
            english TEXT,
            swedish TEXT,
            spanish TEXT,
            german TEXT
            )`,
      (err) => {
        if (err) {
          console.error("Fruit table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

module.exports = db;
