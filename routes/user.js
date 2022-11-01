require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.get("/", authenticateToken, (req, res) => {
  let select = "SELECT * FROM users WHERE jwt = ?";
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  rowData = [];

  userDB.all(select, token, (error, rows) => {
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

    let insert = "INSERT INTO users (username, password, jwt) VALUES (?,?,?)";
    userDB.run(insert, [user.username, user.password, ""]);

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
          let insert = "UPDATE users SET jwt = ? WHERE username = ?";
          userDB.run(insert, [accessToken, user.username]);
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

router.delete("/logout", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let insert = "UPDATE users SET jwt = ? WHERE jwt = ?";
  userDB.run(insert, ["", token]);
  res.status(204).end();
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
