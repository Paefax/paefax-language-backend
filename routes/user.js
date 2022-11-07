require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("No token registered");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("The token is invalid");
    req.user = user;
    next();
  });
};

router.get("/", authenticateToken, (req, res) => {
  let select = "SELECT * FROM users WHERE jwt = ?";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  rowData = [];

  userDB.all(select, token, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    rows.forEach((row) => {
      rowData.push(row);
    });
    res.json(rowData);
  });
});

router.post("/create", async (req, res) => {
  let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");

  //Change to get
  findUser.each(
    req.body.name,
    (error, row) => {},
    async (error, row) => {
      findUser.finalize();
      console.log(row);
      if (!row) {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const user = { username: req.body.name, password: hashedPassword };

          let insert =
            "INSERT INTO users (username, password, jwt) VALUES (?,?,?)";
          userDB.run(insert, [user.username, user.password, ""]);

          res.status(201).send();
          console.log(rowData);
        } catch {
          res.status(400).send();
        }
      } else {
        res.status(400).send("User already exists");
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  rowData = [];
  let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");

  findUser.each(
    req.body.name,
    async (error, row) => {
      rowData.push(row);
      const user = rowData.find((user) => user.username === req.body.name);
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          let update = "UPDATE users SET jwt = ? WHERE username = ?";
          userDB.run(update, [accessToken, user.username]);
          res.json({ accessToken: accessToken }).send();
        } else {
          res.status(401).send("Invalid login");
        }
      } catch {
        res.status(401).send();
      }
    },
    (error, row) => {
      findUser.finalize();
      if (!row) {
        res.status(400).send("Invalid login");
      }
    }
  );
});

router.delete("/logout", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let insert = "UPDATE users SET jwt = ? WHERE jwt = ?";
  userDB.run(insert, ["", token]);
  res.status(204).end();
});

router.get("/quiz/:language", authenticateToken, async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const language = req.params.language.toLowerCase();
  let userId = 0;

  let quizzes = [];

  const selectId = "SELECT id FROM users WHERE jwt = ?";

  userDB.all(selectId, token, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    } else {
      if (rows[0] !== undefined) {
        userId = rows[0].id;
      }

      const selectQuiz =
        "SELECT user_quiz.id, user_quiz.name, user_quiz.language, JSON_GROUP_ARRAY(JSON_OBJECT('word', user_quiz_question.word, 'correctAnswer', user_quiz_question.correctAnswer)) AS questions FROM user_quiz INNER JOIN user_quiz_question ON user_quiz_question.userQuizId = user_quiz.id WHERE userId = ? AND language = ? GROUP BY user_quiz.id";

      userDB.all(selectQuiz, [userId, language], (error, rows) => {
        if (error) {
          console.error(error);
          res.status(404).send();
        } else {
          quizzes = rows;

          if (quizzes.length === 0) {
            console.error(
              "User with id:",
              userId,
              "and quiz language:",
              language,
              "not found!"
            );
            res.status(404).end();
          } else {
            res.status(200).json(quizzes);
          }
        }
      });
    }
  });
});

router.get("/quiz/get/:quizId", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const quizId = req.params.quizId;
  let userId = 0;

  let quizzes = [];

  const selectId = "SELECT id FROM users WHERE jwt = ?";

  userDB.all(selectId, token, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    } else {
      userId = rows[0].id;

      const select =
        "SELECT user_quiz.id, user_quiz.name, user_quiz.language, JSON_GROUP_ARRAY(JSON_OBJECT('word', user_quiz_question.word, 'correctAnswer', user_quiz_question.correctAnswer)) AS questions FROM user_quiz INNER JOIN user_quiz_question ON user_quiz_question.userQuizId = user_quiz.id WHERE user_quiz.id = ? AND user_quiz.userId = ? GROUP BY user_quiz.id";

      userDB.all(select, [quizId, userId], (error, rows) => {
        if (error) {
          console.error(error);
          res.status(404).send();
        } else {
          quizzes = rows;

          if (quizzes.length === 0) {
            console.error("Quiz with id:", quizId, "not found!");
            res.status(404).end();
          } else {
            res.status(200).json(quizzes);
          }
        }
      });
    }
  });
});

router.post("/quiz", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  let name = req.body.name;
  let language = req.body.language;
  let questions = req.body.questions;
  let userId = 0;

  const selectId = "SELECT id FROM users WHERE jwt = ?";

  userDB.all(selectId, token, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).end();
    } else {
      userId = rows[0].id;

      let insert =
        "INSERT INTO user_quiz (name, language, userId) VALUES (?,?,?)";

      userDB.run(insert, [name, language, userId], function (error) {
        if (error) {
          console.error("Insert failed ", error);
          res.status(500).send("Insert failed");
        } else {
          insert =
            "INSERT INTO user_quiz_question (word, correctAnswer, userQuizId) VALUES (?,?,?)";

          questions.forEach((question) => {
            userDB.run(insert, [
              question.word,
              question.correctAnswer,
              this.lastID,
            ]);
          });

          res.status(201).end();
        }
      });
    }
  });
});

module.exports = router;
