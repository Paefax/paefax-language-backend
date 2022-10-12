const express = require("express");
const app = express();
const port = 3000;
var db = require("./database.js");
const numberOfQuestions = 5;

app.get("/", (req, res) => {
  res.json({
    category: "Fruit",
    questions: [
      {
        id: 0,
        word: "apple",
        correctAnswer: "äpple",
        incorrectAnswers: ["ananas", "kiwi"],
      },
      {
        id: 1,
        word: "pear",
        correctAnswer: "päron",
        incorrectAnswers: ["äpple", "mango"],
      },
      {
        id: 2,
        word: "pineapple",
        correctAnswer: "ananas",
        incorrectAnswers: ["mango", "jordgubbe"],
      },
      {
        id: 3,
        word: "strawberry",
        correctAnswer: "jordgubbe",
        incorrectAnswers: ["björnbär", "hallon"],
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const getQuestions = (rows) => {
  var currentQuestions = [];
  let placeInRowArray = 0;
  for (let i = 0; i < numberOfQuestions; i++) {
    currentQuestions.push({
      id: i,
      word: rows[placeInRowArray].english,
      correctAnswer: rows[placeInRowArray++].swedish,
      incorrectAnswers: [
        rows[placeInRowArray++].swedish,
        rows[placeInRowArray++].swedish,
      ],
    });
  }
  return currentQuestions;
};

app.get("/fruit", (req, res) => {
  var sql = "select english,swedish from fruit order by random() limit ?;";
  var params = [numberOfQuestions * 3];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    var currentQuestions = getQuestions(rows);
    res.json({
      category: "fruit",
      questions: currentQuestions,
    });
  });
});
