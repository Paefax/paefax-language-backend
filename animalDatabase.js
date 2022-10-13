let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "animal.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO animal (english, swedish) VALUES (?,?)";
  db.run(insert, ["Monkey", "Apa"]);
  db.run(insert, ["Bee", "Bi"]);
  db.run(insert, ["Bear", "Björn"]);
  db.run(insert, ["Octopus", "Bläckfisk"]);
  db.run(insert, ["Beaver", "Bäver"]);
  db.run(insert, ["Dolphin", "Delfin"]);
  db.run(insert, ["Squirrel", "Ekorre"]);
  db.run(insert, ["Elephant", "Elefant"]);
  db.run(insert, ["Fish", "Fisk"]);
  db.run(insert, ["Butterfly", "Fjäril"]);
  db.run(insert, ["Bat", "Fladdermus"]);
  db.run(insert, ["Fly", "Fluga"]);
  db.run(insert, ["Bird", "Fågel"]);
  db.run(insert, ["Sheep", "Får"]);
  db.run(insert, ["Goat", "Get"]);
  db.run(insert, ["Wasp", "Geting"]);
  db.run(insert, ["Gorilla", "Gorilla"]);
  db.run(insert, ["Pig", "Gris"]);
  db.run(insert, ["Frog", "Groda"]);
  db.run(insert, ["Grasshopper", "Gräshoppa"]);
  db.run(insert, ["Badger", "Grävling"]);
  db.run(insert, ["Shark", "Haj"]);
  db.run(insert, ["Hare", "Hare"]);
  db.run(insert, ["Deer", "Hjort"]);
  db.run(insert, ["Dog", "Hund"]);
  db.run(insert, ["Horse", "Häst"]);
  db.run(insert, ["Chicken", "Höna"]);
  db.run(insert, ["Hedgehog", "Igelkott"]);
  db.run(insert, ["Wolverine", "Järv"]);
  db.run(insert, ["Rabbit", "Kanin"]);
  db.run(insert, ["Cat", "Katt"]);
  db.run(insert, ["Cow", "Ko"]);
  db.run(insert, ["Lion", "Lejon"]);
  db.run(insert, ["Ant", "Myra"]);
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
