let sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "users.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQlite user database.");
    db.run(
      `CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT            
            )`,
      (err) => {
        if (err) {
          console.error("User table already created");
        }
      }
    );

    db.run(
      `CREATE TABLE user_quiz (
            id INTEGER PRIMARY KEY,
            name TEXT,
            language TEXT,
            userId INTEGER,
            FOREIGN KEY (userId) REFERENCES users (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE        
            )`,
      (err) => {
        if (err) {
          console.error("User-quiz table already created");
        }
      }
    );

    db.run(
      `CREATE TABLE user_quiz_question (
            id INTEGER PRIMARY KEY,
            question TEXT,
            correctAnswer TEXT,
            userQuizId INTEGER,
            FOREIGN KEY (userQuizId) REFERENCES user_quiz (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE      
            )`,
      (err) => {
        if (err) {
          console.error("User-quiz-question table already created");
        }
      }
    );
  }
});

module.exports = db;
