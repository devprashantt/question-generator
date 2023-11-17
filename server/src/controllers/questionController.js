const express = require("express");
const bodyParser = require("body-parser");
const QuestionService = require("../services/questionService");

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

function generateQuestionPaper(totalMarks, difficultyDistribution, questions) {
  const questionPaper = [];

  for (const difficulty in difficultyDistribution) {
    if (difficultyDistribution.hasOwnProperty(difficulty)) {
      const percentage = difficultyDistribution[difficulty];
      const marksForDifficulty = Math.floor((totalMarks * percentage) / 100);

      console.log("marking for difficulty", marksForDifficulty);

      // Calculate remaining marks for other difficulty levels
      const remainingMarks =
        totalMarks - questionPaper.reduce((sum, q) => sum + q.marks, 0);

      console.log("remaining marks", remainingMarks);

      // Ensure marksForDifficulty is within the remaining marks
      const actualMarksForDifficulty = Math.min(
        marksForDifficulty,
        remainingMarks
      );

      console.log("actualMarksForDifficulty", actualMarksForDifficulty);

      if (actualMarksForDifficulty > 0) {
        const filteredQuestions = questions.filter(
          (q) => q.difficulty === difficulty
        );
        const selectedQuestions = filteredQuestions.slice(
          0,
          actualMarksForDifficulty
        );

        questionPaper.push(...selectedQuestions);
      }
    }
  }

  return questionPaper;
}

module.exports = router;
