const express = require("express");
const router = express.Router();
let fruitDB = require("../fruitDatabase.js");
const numberOfQuestions = 5;

const getQuestions = (rows) => {
  let currentQuestions = [];
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

router.get("/", (req, res) => {
  let sql = "select english,swedish from fruit order by random() limit ?;";
  let params = [numberOfQuestions * 3];
  fruitDB.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    let currentQuestions = getQuestions(rows);
    res.json({
      category: "fruit",
      questions: currentQuestions,
    });
  });
});

module.exports = router;
