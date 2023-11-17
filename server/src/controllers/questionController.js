const express = require("express");
const bodyParser = require("body-parser");
const QuestionService = require("../services/questionService");
const generateQuestionPaper = require("../utils/questionGenerator");

const router = express.Router();
router.use(bodyParser.json());

const questionService = new QuestionService();

router.post("/generate", (req, res) => {
  try {
    const totalMarks = req.body.totalMarks;
    const difficultyDistribution = req.body.difficultyDistribution;

    if (!totalMarks || !difficultyDistribution) {
      return res.status(400).json({
        error:
          "Invalid input. Please provide totalMarks and difficultyDistribution.",
      });
    }

    const questions = questionService.getAllQuestions();

    const questionPaper = generateQuestionPaper(
      totalMarks,
      difficultyDistribution,
      questions
    );

    res.status(200).json(questionPaper);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
