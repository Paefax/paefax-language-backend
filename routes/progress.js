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
    } else {
      rows.forEach((row) => {
        rowData.push(row);
      });
      res.json(rowData);
    }
  });
});

router.post("/update", authenticateToken, (req, res) => {
  const language = req.body.language;
  const category = req.body.category;
  const userId = 1; //Hard coded for now.

  let select =
    "SELECT progress FROM progress WHERE userId=? AND language=? AND category=?";
  let params = [userId, language, category];
  const rowData = [];
  progressDB.all(select, params, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    rows.forEach((row) => {
      rowData.push(row);
    });
    if (rowData.length === 0) {
      addNewProgress(res, userId, language, category);
    } else {
      currentProgress = rowData[0].progress;
      newProgress = currentProgress + 10;
      if (newProgress <= 100) {
        updateProgress(res, newProgress, userId, language, category);
      } else {
        res.status(200).send();
      }
    }
  });
});

const addNewProgress = (res, userId, language, category) => {
  let firstProgress = 10;
  try {
    let insert =
      "INSERT INTO progress (userId, language, category, progress) VALUES (?,?,?,?)";
    progressDB.run(insert, [userId, language, category, firstProgress]);
    res.status(201).send();
    console.log(rowData);
  } catch {
    res.status(400).send();
  }
};

const updateProgress = (res, progress, userId, language, category) => {
  try {
    let update =
      "UPDATE progress SET progress = ? WHERE userId = ? AND language = ? AND category = ?;";
    progressDB.run(update, [progress, userId, language, category]);
    res.status(200).send();
    console.log(rowData);
  } catch {
    res.status(400).send();
  }
};

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
