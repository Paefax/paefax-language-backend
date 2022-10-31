const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;
const fruit = require("./routes/fruit");
const animal = require("./routes/animal");
const occupation = require("./routes/occupation");
const user = require("./routes/user");
const progress = require("./routes/progress");
const languages = require("./routes/languages");
const categories = require("./routes/categories");

app.use(express.json());

app.use(cors());
app.use("/images", express.static("assets/images"));
app.use("/fruit", fruit);
app.use("/animal", animal);
app.use("/occupation", occupation);
app.use("/user", user);
app.use("/languages", languages);
app.use("/categories", categories);
app.use("/progress", progress);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
