let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "occupation.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO occupation (english, swedish) VALUES (?,?)";
  db.run(insert, ["Lawyer", "Advokat"]);
  db.run(insert, ["Architect", "Arkitekt"]);
  db.run(insert, ["Baker", "Bagare"]);
  db.run(insert, ["Banker", "Banktjänsteman"]);
  db.run(insert, ["Librarian", "Bibliotekarie"]);
  db.run(insert, ["Fireman", "Brandman"]);
  db.run(insert, ["Clerk", "Butiksbiträde"]);
  db.run(insert, ["Stockbroker", "Börsmäklare"]);
  db.run(insert, ["Driver", "Chaufför"]);
  db.run(insert, ["Doctor", "Doktor"]);
  db.run(insert, ["Barber", "Frisör"]);
  db.run(insert, ["Craftsman", "Hantverkare"]);
  db.run(insert, ["Engineer", "Ingenjör"]);
  db.run(insert, ["Journalist", "Journalist"]);
  db.run(insert, ["Chemist", "Kemist"]);
  db.run(insert, ["Chef", "Kock"]);
  db.run(insert, ["Consultant", "Konsult"]);
  db.run(insert, ["Farmer", "Lantbrukare"]);
  db.run(insert, ["Teacher", "Lärare"]);
  db.run(insert, ["Police officer", "Polis"]);
  db.run(insert, ["Politician", "Politiker"]);
  db.run(insert, ["Programmer", "Programmerare"]);
  db.run(insert, ["Psychiatrist", "Psykiatriker"]);
  db.run(insert, ["Psychologist", "Psykolog"]);
  db.run(insert, ["Plumber", "Rörmokare"]);
  db.run(insert, ["Secretary", "Sekreterare"]);
  db.run(insert, ["Waiter", "Servitör"]);
  db.run(insert, ["Nurse", "Sjuksköterska"]);
  db.run(insert, ["Carpenter", "Snickare"]);
  db.run(insert, ["Social worker", "Socialarbetare"]);
  db.run(insert, ["Cleaner", "Städare"]);
  db.run(insert, ["Dentist", "Tandläkare"]);
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
