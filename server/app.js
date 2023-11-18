const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const questionRoutes = require("./src/routes/question.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/questions", questionRoutes);

app.get("/", function (req, res) {
  res.json({
    msg: "Hello from question generator!",
  });
});

app.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port}`);
});
