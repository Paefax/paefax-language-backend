require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.get("/", authenticateToken, (req, res) => {
  let select = "SELECT * FROM users";

  rowData = [];

  userDB.all(select, (error, rows) => {
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
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.name, password: hashedPassword };

    let insert = "INSERT INTO users (username, password) VALUES (?,?)";
    userDB.run(insert, [user.username, user.password]);

    res.status(201).send();
    console.log(rowData);
  } catch {
    res.status(400).send();
  }
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

      if (user === null) {
        return res.status(400).send("Cannot find user");
      }

      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.json({ accessToken: accessToken }).send();
          console.log(rowData);
        } else {
          res.status(401).send("Wrong password");
        }
      } catch {
        res.status(401).send();
      }
    },
    (error, row) => {
      findUser.finalize();
    }
  );
});

router.delete("/logout", (req, res) => {});

router.get("/quiz/:userId/:language", authenticateToken, (req, res) => {
  let userId = req.params.userId;
  let language = req.params.language;

  let quizzes = [];

  let select = "SELECT * FROM user_quiz WHERE userId = ? AND language = ?";

  userDB.all(select, [userId, language], (error, rows) => {
    if (error) {
      console.error("No such Quiz ", error);
      res.status(404).send("No such User Quiz");
    } else {
      select = "SELECT * FROM user_quiz_question WHERE userQuizId = ?";

      for (let i = 0; i < rows.length; i++) {
        let userQuiz = {
          name: rows[i].name,
          language: rows[i].language,
          questions: [],
        };

        userDB.all(select, [i + 1], (error, rows) => {
          if (error) {
            console.error("No such Questions ", error);
            res.status(404).send("Quiz contains no questions");
          } else {
            console.log("Rows ", rows);
            userQuiz.questions = rows;

            console.log("User quiz ", userQuiz);
            quizzes.push(userQuiz);
          }
        });
      }
    }

    console.log("All quizzes ", quizzes);
    res.status(200).json(quizzes);
  });
});

router.get("/quiz/:quizId", authenticateToken, (req, res) => {
  console.log("Get one with Quiz Id ", req.params.quizId);
  res.status(200).end();
});

router.post("/quiz", authenticateToken, (req, res) => {
  let name = req.body.name;
  let language = req.body.language;
  let userId = 1;
  let questions = req.body.questions;

  let insert = "INSERT INTO user_quiz (name, language, userId) VALUES (?,?,?)";

  userDB.run(insert, [name, language, userId], function (error) {
    if (error) {
      console.error("Insert failed ", error);
      res.status(500).send("Insert failed");
    } else {
      insert =
        "INSERT INTO user_quiz_question (question, correctAnswer, userQuizId) VALUES (?,?,?)";

      questions.forEach((question) => {
        userDB.run(insert, [
          question.question,
          question.correctAnswer,
          this.lastID,
        ]);
      });

      res.status(201).end();
    }
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("No token registered");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("The token is unvalid");
    req.user = user;
    next();
  });
}

module.exports = router;
