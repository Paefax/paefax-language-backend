const express = require("express");
const router = express.Router();
let languageDB = require("../languageDatabase.js");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM languages";

  languageDB.all(sql, (err, rows) => {
    res.status(200).json(rows);
  });
});

module.exports = router;
