const express = require("express");
const router = express.Router();
let fruitDB = require("../fruitDatabase.js");
const utilities = require("./utilities");
const numberOfQuestions = 5;
const implementedLanguages = ["swedish"];

router.get("/:language", (req, res) => {
  if (!implementedLanguages.includes(req.params.language)) {
    console.log("not included");
    res.status(400).json({
      error: `${req.params.language} is not an implemented language. Implemented languages are ${implementedLanguages}`,
    });
    return;
  }
  let sql = `select english,${req.params.language} from fruit order by random() limit ?;`;
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
