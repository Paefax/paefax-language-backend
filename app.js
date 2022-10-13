const express = require("express");
const app = express();
const port = 3000;
const fruit = require("./routes/fruit");
const animal = require("./routes/animal");
app.use("/fruit", fruit);
app.use("/animal", animal);

app.get("/", (req, res) => {
  res.json({
    category: "Fruit",
    questions: [
      {
        id: 0,
        word: "apple",
        correctAnswer: "äpple",
        incorrectAnswers: ["ananas", "kiwi"],
      },
      {
        id: 1,
        word: "pear",
        correctAnswer: "päron",
        incorrectAnswers: ["äpple", "mango"],
      },
      {
        id: 2,
        word: "pineapple",
        correctAnswer: "ananas",
        incorrectAnswers: ["mango", "jordgubbe"],
      },
      {
        id: 3,
        word: "strawberry",
        correctAnswer: "jordgubbe",
        incorrectAnswers: ["björnbär", "hallon"],
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
