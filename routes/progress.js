require("dotenv").config();
const express = require("express");
const router = express.Router();
let progressDB = require("../progressDatabase.js");
const jwt = require("jsonwebtoken");

router.get("/", authenticateToken, (req, res) => {
  let userId = 1; //This should not be hard coded. Should get userId from JWT in future

  let select = "SELECT language,category,progress FROM progress WHERE userId=?";
  let params = [userId];
  const rowData = [];
  progressDB.all(select, params, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    rows.forEach((row) => {
      rowData.push(row);
    });
    res.json(rowData).send();
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("No token registered");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("The token is unvalid");
    req.user = user;
    next();
  });
}

module.exports = router;
