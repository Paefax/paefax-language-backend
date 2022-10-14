let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "animal.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO animal (english, swedish) VALUES (?,?)";
  db.run(insert, ["Monkey", "Apa","Mono"]);
  db.run(insert, ["Bee", "Bi","Abeja"]);
  db.run(insert, ["Bear", "Björn","Llevar"]);
  db.run(insert, ["Octopus", "Bläckfisk","Pulpo"]);
  db.run(insert, ["Beaver", "Bäver","Castor"]);
  db.run(insert, ["Dolphin", "Delfin","Delfín"]);
  db.run(insert, ["Squirrel", "Ekorre","Ardilla"]);
  db.run(insert, ["Elephant", "Elefant","Elefante"]);
  db.run(insert, ["Fish", "Fisk","Pez"]);
  db.run(insert, ["Butterfly", "Fjäril","Mariposa"]);
  db.run(insert, ["Bat", "Fladdermus","Murciélago"]);
  db.run(insert, ["Fly", "Fluga","Volar"]);
  db.run(insert, ["Bird", "Fågel","Pájaro"]);
  db.run(insert, ["Sheep", "Får","Oveja"]);
  db.run(insert, ["Goat", "Get","Cabro"]);
  db.run(insert, ["Wasp", "Geting","Avispa"]);
  db.run(insert, ["Gorilla", "Gorilla","Gorila"]);
  db.run(insert, ["Pig", "Gris","Cerdo"]);
  db.run(insert, ["Frog", "Groda","Rana"]);
  db.run(insert, ["Grasshopper", "Gräshoppa","Saltamontes"]);
  db.run(insert, ["Badger", "Grävling","Tejón"]);
  db.run(insert, ["Shark", "Haj","Tiburón"]);
  db.run(insert, ["Hare", "Hare","Liebre"]);
  db.run(insert, ["Deer", "Hjort","Ciervo"]);
  db.run(insert, ["Dog", "Hund","Perro"]);
  db.run(insert, ["Horse", "Häst","Caballo"]);
  db.run(insert, ["Chicken", "Höna","Pollo"]);
  db.run(insert, ["Hedgehog", "Igelkott","Erizo"]);
  db.run(insert, ["Wolverine", "Järv","Glotón"]);
  db.run(insert, ["Rabbit", "Kanin","Conejo"]);
  db.run(insert, ["Cat", "Katt","Gato"]);
  db.run(insert, ["Cow", "Ko","Vaca"]);
  db.run(insert, ["Lion", "Lejon","León"]);
  db.run(insert, ["Ant", "Myra","Hormiga"]);
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
