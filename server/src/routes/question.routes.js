const express = require("express");
const questionController = require("./../controllers/questionController");

const router = express.Router();

router.post("/generate", questionController.generateQuestionPaper);
router.get("/all", questionController.getAllQuestions);
router.get("/random", questionController.getRandomQuestion);

router.post("/create", questionController.createQuestion);

module.exports = router;
