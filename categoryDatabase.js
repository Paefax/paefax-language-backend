let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "categories.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite categories database.");
    db.run(
      `CREATE TABLE categories (
                  id INTEGER PRIMARY KEY,
                  name TEXT,
                  img TEXT,
                  alt TEXT,
                  link TEXT
                  )`,
      (err) => {
        if (err) {
          console.error("Category table already created");
        } else {
          fillDatabase(db);
        }
      }
    );
  }
});

const fillDatabase = (db) => {
  let insert = "INSERT INTO categories (name, img, alt, link) VALUES (?,?,?,?)";

  db.run(insert, [
    "Fruit",
    "http://localhost:3000/images/fruits.png",
    "fruits",
    "/quiz",
  ]);
  db.run(insert, [
    "Animal",
    "http://localhost:3000/images/animal.jpg",
    "animals",
    "/quiz",
  ]);
  db.run(insert, [
    "Occupation",
    "http://localhost:3000/images/occupation.jpg",
    "occupations",
    "/quiz",
  ]);
};

module.exports = db;
