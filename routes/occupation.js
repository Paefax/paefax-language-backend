const express = require("express");
const router = express.Router();
let occupationDB = require("../occupationDatabase.js");
const utilities = require("./utilities/utilities");
const numberOfQuestions = 5;
const implementedLanguages = ["swedish", "german", "spanish"];

router.get("/:language", (req, res) => {
  if (!implementedLanguages.includes(req.params.language)) {
    res.status(400).json({
      error: `${req.params.language} is not an implemented language. Implemented languages are ${implementedLanguages}`,
    });
    return;
  }
  let sql = `select english,${req.params.language} from occupation order by random() limit ?;`;
  let params = [numberOfQuestions * 3];
  occupationDB.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    let currentQuestions = utilities.getQuestions(
      rows,
      numberOfQuestions,
      req.params.language
    );
    res.json({
      category: "occupation",
      questions: currentQuestions,
    });
  });
});

module.exports = router;
