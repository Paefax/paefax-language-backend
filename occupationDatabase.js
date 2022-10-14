let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "occupation.db";

const fillDatabase = (db) => {
  let insert = "INSERT INTO occupation (english, swedish) VALUES (?,?)";
  db.run(insert, ["Lawyer", "Advokat","Abogado"]);
  db.run(insert, ["Architect", "Arkitekt","Arquitecto"]);
  db.run(insert, ["Baker", "Bagare","Panadero"]);
  db.run(insert, ["Banker", "Banktjänsteman","Banquero"]);
  db.run(insert, ["Librarian", "Bibliotekarie","Bibliotecario"]);
  db.run(insert, ["Fireman", "Brandman","Bombero"]);
  db.run(insert, ["Clerk", "Butiksbiträde","Empleado"]);
  db.run(insert, ["Stockbroker", "Börsmäklare","Corredor de valores"]);
  db.run(insert, ["Driver", "Chaufför","Conductor"]);
  db.run(insert, ["Doctor", "Doktor","Médico"]);
  db.run(insert, ["Barber", "Frisör","Barbero"]);
  db.run(insert, ["Craftsman", "Hantverkare","Artesano"]);
  db.run(insert, ["Engineer", "Ingenjör","Ingeniero"]);
  db.run(insert, ["Journalist", "Journalist","Periodista"]);
  db.run(insert, ["Chemist", "Kemist","Químico"]);
  db.run(insert, ["Chef", "Kock","Cocinero"]);
  db.run(insert, ["Consultant", "Konsult","Consultor"]);
  db.run(insert, ["Farmer", "Lantbrukare","Granjero"]);
  db.run(insert, ["Teacher", "Lärare","Maestro"]);
  db.run(insert, ["Police officer", "Polis","Oficial de policía"]);
  db.run(insert, ["Politician", "Politiker","Político"]);
  db.run(insert, ["Programmer", "Programmerare","Programador"]);
  db.run(insert, ["Psychiatrist", "Psykiatriker","Psiquiatra"]);
  db.run(insert, ["Psychologist", "Psykolog","Psicólogo"]);
  db.run(insert, ["Plumber", "Rörmokare","Plomero"]);
  db.run(insert, ["Secretary", "Sekreterare","Secretario"]);
  db.run(insert, ["Waiter", "Servitör","Mesero"]);
  db.run(insert, ["Nurse", "Sjuksköterska","Enfermero"]);
  db.run(insert, ["Carpenter", "Snickare","Carpintero"]);
  db.run(insert, ["Social worker", "Socialarbetare","Trabajador social"]);
  db.run(insert, ["Cleaner", "Städare","Limpiador"]);
  db.run(insert, ["Dentist", "Tandläkare","Dentista"]);
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
