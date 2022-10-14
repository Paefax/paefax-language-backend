let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "occupation.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO occupation (english, swedish) VALUES (?,?)";
  db.run(insert, ["Lawyer", "Advokat","Abogado","Anwalt"]);
  db.run(insert, ["Architect", "Arkitekt","Arquitecto","Architekt"]);
  db.run(insert, ["Baker", "Bagare","Panadero","Bäcker"]);
  db.run(insert, ["Banker", "Banktjänsteman","Banquero","Banker"]);
  db.run(insert, ["Librarian", "Bibliotekarie","Bibliotecario","Bibliothekar"]);
  db.run(insert, ["Fireman", "Brandman","Bombero","Feuerwehrmann"]);
  db.run(insert, ["Clerk", "Butiksbiträde","Empleado","Schreiber"]);
  db.run(insert, ["Stockbroker", "Börsmäklare","Corredor de valores","Börsenmakler"]);
  db.run(insert, ["Driver", "Chaufför","Conductor","Treiber"]);
  db.run(insert, ["Doctor", "Doktor","Médico","Arzt"]);
  db.run(insert, ["Barber", "Frisör","Barbero","Barbier"]);
  db.run(insert, ["Craftsman", "Hantverkare","Artesano","Handwerker"]);
  db.run(insert, ["Engineer", "Ingenjör","Ingeniero","Ingenieur"]);
  db.run(insert, ["Journalist", "Journalist","Periodista","Journalist"]);
  db.run(insert, ["Chemist", "Kemist","Químico","Chemiker"]);
  db.run(insert, ["Chef", "Kock","Cocinero","Koch"]);
  db.run(insert, ["Consultant", "Konsult","Consultor","Berater"]);
  db.run(insert, ["Farmer", "Lantbrukare","Granjero","Farmer"]);
  db.run(insert, ["Teacher", "Lärare","Maestro","Lehrer"]);
  db.run(insert, ["Police officer", "Polis","Oficial de policía","Polizist"]);
  db.run(insert, ["Politician", "Politiker","Político","Politiker"]);
  db.run(insert, ["Programmer", "Programmerare","Programador","Programmierer"]);
  db.run(insert, ["Psychiatrist", "Psykiatriker","Psiquiatra","Psychiater"]);
  db.run(insert, ["Psychologist", "Psykolog","Psicólogo","Psychologe"]);
  db.run(insert, ["Plumber", "Rörmokare","Plomero","Klempner"]);
  db.run(insert, ["Secretary", "Sekreterare","Secretario","Sekretär"]);
  db.run(insert, ["Waiter", "Servitör","Mesero","Kellner"]);
  db.run(insert, ["Nurse", "Sjuksköterska","Enfermero","Krankenpfleger"]);
  db.run(insert, ["Carpenter", "Snickare","Carpintero","Tischler"]);
  db.run(insert, ["Social worker", "Socialarbetare","Trabajador social","Sozialarbeiter"]);
  db.run(insert, ["Cleaner", "Städare","Limpiador","Reiniger"]);
  db.run(insert, ["Dentist", "Tandläkare","Dentista","Zahnarzt"]);
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
