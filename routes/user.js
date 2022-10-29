require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.get("/", authenticateToken, (req, res) => {
  let select = "SELECT * FROM users";

  rowData = [];

  userDB.all(select, (error, rows) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    rows.forEach((row) => {
      rowData.push(row);
    });
    res.json(rowData);
  });
});

router.post("/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.name, password: hashedPassword };

    let insert = "INSERT INTO users (username, password) VALUES (?,?)";
    userDB.run(insert, [user.username, user.password]);

    res.status(201).send();
    console.log(rowData);
  } catch {
    res.status(400).send();
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  rowData = [];
  let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");

  findUser.each(
    req.body.name,
    async (error, row) => {
      rowData.push(row);

      const user = rowData.find((user) => user.username === req.body.name);

      if (user === null) {
        return res.status(400).send("Cannot find user");
      }

      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.json({ accessToken: accessToken }).send();
          console.log(rowData);
        } else {
          res.status(401).send("Wrong password");
        }
      } catch {
        res.status(401).send();
      }
    },
    (error, row) => {
      findUser.finalize();
    }
  );
});

router.delete("/logout", (req, res) => {});

router.get("/quiz/:id/:language", authenticateToken, (req, res) => {
  let language = req.params.language;
  let userId = req.params.id;

  let select = "SELECT * FROM user_quiz WHERE language = ? AND userId = ?";

  userDB.all(select, [language, userId], (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).end();
    } else [];
  });

  console.log("Get all");
  res.status(200).end();
});

router.get("/quiz/:id", authenticateToken, (req, res) => {
  console.log("Get one with id ", req.params.id);
  res.status(200).end();
});

router.post("/quiz", authenticateToken, (req, res) => {
  console.log(
    "Post one ",
    req.body.name,
    req.body.language,
    req.body.questions
  );
  res.status(200).end();
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
