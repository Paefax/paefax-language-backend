require("dotenv").config();

const express = require("express");
const router = express.Router();
let userDB = require("../userDatabase.js");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { OPEN_READWRITE } = require("sqlite3");

// Should be entered into a database
let refreshTokens = [];

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "45s" });
};

router.post("/user/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).send("Error 1");
  if (!refreshTokens.includes(refreshToken)) {
    console.log(refreshTokens);
    return res.status(403).send("Error 2");
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Error 3");
    }
    const accessToken = generateAccessToken({ name: user.username });
    res.json({ accessToken: accessToken });
  });
});

router.post("/user/login", async (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

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
          res
            .json({ accessToken: accessToken, refreshToken: refreshToken })
            .send();
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

router.get("/user", authenticateToken, (req, res) => {
  // Ta emot token
  const authHeader = req.headers["authorization"];

  //JWT Verify auth heather

  let select;
  rowData = [];

  try {
    const decodedToken = jwt.verify(
      authHeader,
      process.env.ACCESS_TOKEN_SECRET
    );
    userDB.all(select, (error, rows) => {
      if (error) {
        res.status(500).send();
      }
      rows.forEach((row) => {
        rowData.push(row);
      });

      res.json(rowData).send();
    });
  } catch {
    console.log(authHeader);
    res.statusMessage = "Json token invalid";
    res.status(401).end();
  }
});

router.post("/user/create", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.name, password: hashedPassword };

    let insert = "INSERT INTO users (username, password) VALUES (?,?)";
    userDB.run(insert, [user.username, user.password]);

    res.status(201).send();
  } catch {
    res.status(400).send();
  }
});

router.delete("/user/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
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
