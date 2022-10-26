const express = require("express");
const router = express.Router();
let progressDB = require("../progressDatabase.js");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM progress";

  progressDB.all(sql, (err, rows) => {
    res.status(200).json(rows);
  });
});

module.exports = router;
