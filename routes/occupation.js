const express = require("express");
const router = express.Router();
let occupationDB = require("../occupationDatabase.js");

router.get("/", (req, res) => {
  res.json({ message: "Hello from occupation" });
});

module.exports = router;
