const QuestionService = require("../services/questionService");

const questionService = new QuestionService();

const getAllQuestions = async (req, res) => {
  try {
    const questions = questionService.getAllQuestions();

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRandomQuestion = async (req, res) => {
  try {
    const question = questionService.getRandomQuestion();

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createQuestion = async (req, res) => {
  try {
    const question = req.body.question;
    const subject = req.body.subject;
    const difficulty = req.body.difficulty;
    const marks = req.body.marks;

    if (!question || !subject || !difficulty || !marks) {
      return res.status(400).json({
        error:
          "Invalid input. Please provide question, subject, difficulty and marks.",
      });
    }

    const newQuestion = questionService.createQuestion(
      question,
      subject,
      difficulty,
      marks
    );

    res.status(200).json(newQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateQuestionPaper = async (req, res) => {
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

    const questionPaper = [];
    let totalMarksGenerated = 0;

    for (const difficulty in difficultyDistribution) {
      if (difficultyDistribution.hasOwnProperty(difficulty)) {
        const percentage = difficultyDistribution[difficulty];
        const marksForDifficulty = Math.floor((totalMarks * percentage) / 100);

        // Get questions for this difficulty level
        const questionsForDifficulty = questions.filter(
          (q) => q.difficulty === difficulty
        );

        // Sort questions randomly for variations
        questionsForDifficulty.sort(() => Math.random() - 0.5);

        // Push for this difficulty level in questionPaper and sum should be less than marksForDifficulty
        let sum = 0;
        for (const question of questionsForDifficulty) {
          if (sum + question.marks <= marksForDifficulty) {
            questionPaper.push(question);
            sum += question.marks;
          }
        }

        // Add sum to totalMarksGenerated
        totalMarksGenerated += sum;
      }
    }

    // If totalMarksGenerated is smaller than totalMarks then find a question which has marks equal to totalMarks - totalMarksGenerated
    if (totalMarksGenerated < totalMarks) {
      const remainingMarks = totalMarks - totalMarksGenerated;
      const questionsForRemainingMarks = questions.filter(
        (q) => q.marks === remainingMarks
      );

      // If there is no remaining marks break the if statement
      if (questionsForRemainingMarks.length != 0) {
        // Update the totalMarksGenerated
        totalMarksGenerated += remainingMarks;

        // Sort questions randomly for variations
        questionsForRemainingMarks.sort(() => Math.random() - 0.5);

        // Push that question into questions array
        questionPaper.push(questionsForRemainingMarks[0]);
      }
    }

    // If totalMarksGenerated is larger than totalMarks then find a question which has marks equal to totalMarksGenerated - totalMarks
    if (totalMarksGenerated > totalMarks) {
      const remainingMarks = totalMarksGenerated - totalMarks;
      const questionsForRemainingMarks = questionPaper.filter(
        (q) => q.marks === remainingMarks
      );

      // If there is no remaining marks break the if statement
      if (questionsForRemainingMarks.length != 0) {
        // Update the totalMarksGenerated
        totalMarksGenerated -= remainingMarks;

        // Remove that question from questions array
        questionPaper.splice(
          questions.indexOf(questionsForRemainingMarks[0]),
          1
        );
      }
    }

    // From questionPaper data also return avg percent of subject included in totalMarksGenerated
    const subjects = {};
    for (const question of questionPaper) {
      if (subjects.hasOwnProperty(question.subject)) {
        subjects[question.subject] += question.marks;
      } else {
        subjects[question.subject] = question.marks;
      }
    }

    res.status(200).json({
      msg: "Question paper generated successfully!!",
      totalMarks: totalMarksGenerated,
      totalQuestionCount: questionPaper.length,
      subjectMarks: subjects,
      questions: questionPaper,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateAIQuestion = async (req, res) => {
  try {
    // GENERATE VIA CHAT GPT API
    const totalMarks = req.body.totalMarks;
    const difficultyDistribution = req.body.difficultyDistribution;

    if (!totalMarks || !difficultyDistribution) {
      return res.status(400).json({
        error:
          "Invalid input. Please provide totalMarks and difficultyDistribution.",
      });
    }

    const questions = questionService.getAllQuestions();

    const questionPaper = [];
    let totalMarksGenerated = 0;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllQuestions,
  getRandomQuestion,
  generateQuestionPaper,
  createQuestion,
};
