let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "animal.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO animal (english, swedish, spanish, german) VALUES (?,?,?,?)";
  db.run(insert, ["Monkey", "Apa","Mono","Affe"]);
  db.run(insert, ["Bee", "Bi","Abeja","Biene"]);
  db.run(insert, ["Bear", "Björn","Llevar","Tragen"]);
  db.run(insert, ["Octopus", "Bläckfisk","Pulpo","Krake"]);
  db.run(insert, ["Beaver", "Bäver","Castor","Biber"]);
  db.run(insert, ["Dolphin", "Delfin","Delfín","Delfin"]);
  db.run(insert, ["Squirrel", "Ekorre","Ardilla","Eichhörnchen"]);
  db.run(insert, ["Elephant", "Elefant","Elefante","Elefant"]);
  db.run(insert, ["Fish", "Fisk","Pez","Fische"]);
  db.run(insert, ["Butterfly", "Fjäril","Mariposa","Schmetterling"]);
  db.run(insert, ["Bat", "Fladdermus","Murciélago","Schläger"]);
  db.run(insert, ["Fly", "Fluga","Volar","Fliegen"]);
  db.run(insert, ["Bird", "Fågel","Pájaro","Vogel"]);
  db.run(insert, ["Sheep", "Får","Oveja","Schaf"]);
  db.run(insert, ["Goat", "Get","Cabro","Ziege"]);
  db.run(insert, ["Wasp", "Geting","Avispa","Wespe"]);
  db.run(insert, ["Gorilla", "Gorilla","Gorila","Gorilla"]);
  db.run(insert, ["Pig", "Gris","Cerdo","Schwein"]);
  db.run(insert, ["Frog", "Groda","Rana","Frosch"]);
  db.run(insert, ["Grasshopper", "Gräshoppa","Saltamontes","Heuschrecke"]);
  db.run(insert, ["Badger", "Grävling","Tejón","Dachs"]);
  db.run(insert, ["Shark", "Haj","Tiburón","Hai"]);
  db.run(insert, ["Hare", "Hare","Liebre","Hase"]);
  db.run(insert, ["Deer", "Hjort","Ciervo","Reh"]);
  db.run(insert, ["Dog", "Hund","Perro","Hund"]);
  db.run(insert, ["Horse", "Häst","Caballo","Pferd"]);
  db.run(insert, ["Chicken", "Höna","Pollo","Huhn"]);
  db.run(insert, ["Hedgehog", "Igelkott","Erizo","Igel"]);
  db.run(insert, ["Wolverine", "Järv","Glotón","Vielfraß"]);
  db.run(insert, ["Rabbit", "Kanin","Conejo","Kaninchen"]);
  db.run(insert, ["Cat", "Katt","Gato","Katze"]);
  db.run(insert, ["Cow", "Ko","Vaca","Kuh"]);
  db.run(insert, ["Lion", "Lejon","León","Löwe"]);
  db.run(insert, ["Ant", "Myra","Hormiga","Ameise"]);
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
            swedish TEXT,
            spanish TEXT,
            german TEXT
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
