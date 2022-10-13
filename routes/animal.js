const express = require("express");
const router = express.Router();
let animalDB = require("../animalDatabase.js");

router.get("/", (req, res) => {
  res.json({ message: "Hello from animal" });
});

module.exports = router;
