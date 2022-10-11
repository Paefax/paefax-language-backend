const express = require("express");
const app = express();
const port = 3000;
var db = require("./database.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const getQuiz = (rows, currentCategory) => {
  var currentQuestions = [];
  console.log("rows", rows);

  currentQuestions.push({
    id: 0,
    word: rows[0].english,
    correctAnswer: rows[0].swedish,
    incorrectAnswers: ["ananas", "kiwi"],
  });
  currentQuestions.push({
    id: 1,
    word: rows[1].english,
    correctAnswer: rows[1].swedish,
    incorrectAnswers: ["äpple", "mango"],
  });

  return {
    category: currentCategory,
    questions: currentQuestions,
  };

  /*
  rows = [
    { english: 'apple', swedish: 'äpple' },
    { english: 'apple', swedish: 'äpple' },
    { english: 'apple', swedish: 'äpple' }
  ]*/
};

app.get("/fruit", (req, res) => {
  var sql = "select english,swedish from fruit order by random() limit 15;";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    var quizObject = getQuiz(rows, "fruit");
    res.json({
      message: "success",
      quiz: quizObject,
    });
  });
});
