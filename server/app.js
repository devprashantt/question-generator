const express = require("express");
const questionController = require("./src/controllers/questionController");

const app = express();
const port = process.env.PORT || 3000;

app.use("/questions", questionController);

app.get("/", function (req, res) {
  res.json({
    msg: "Hello from question generator!",
  });
});

app.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port}`);
});
