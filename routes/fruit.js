const express = require("express");
const router = express.Router();
let fruitDB = require("../fruitDatabase.js");
const utilities = require("./utilities");
const numberOfQuestions = 5;

router.get("/", (req, res) => {
  let sql = "select english,swedish from fruit order by random() limit ?;";
  let params = [numberOfQuestions * 3];
  fruitDB.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    let currentQuestions = utilities.getQuestions(rows, numberOfQuestions);
    res.json({
      category: "fruit",
      questions: currentQuestions,
    });
  });
});

module.exports = router;
