const express = require("express");
const router = express.Router();
let categoryDB = require("../categoryDatabase.js");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM categories";

  categoryDB.all(sql, (err, rows) => {
    res.status(200).json(rows);
  });
});

module.exports = router;