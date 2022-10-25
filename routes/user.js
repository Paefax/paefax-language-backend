require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
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
};

router.get("/user", authenticateToken, (req, res) => {
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
    res.json(rowData).send();
  });
});

router.post("/user/create", async (req, res) => {
  let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");

  //Change to get
  findUser.each(
    req.body.name,
    (error, row) => {},
    async (error, row) => {
      findUser.finalize();
      console.log(row);
      if (!row) {
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
      } else {
        res.status(400).send("User already exists");
      }
    }
  );
});

router.post("/user/login", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  rowData = [];
  let findUser = userDB.prepare("SELECT * FROM users WHERE username = ?");
  console.log("here");

  findUser.each(
    req.body.name,
    async (error, row) => {
      rowData.push(row);
      const user = rowData.find((user) => user.username === req.body.name);
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.json({ accessToken: accessToken }).send();
        } else {
          res.status(401).send("Invalid login");
        }
      } catch {
        res.status(401).send();
      }
    },
    (error, row) => {
      findUser.finalize();
      if (!row) {
        res.status(400).send("Invalid login");
      }
    }
  );
});

router.delete("/logout", (req, res) => {});

module.exports = router;
