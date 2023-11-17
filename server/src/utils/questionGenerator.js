function generateQuestionPaper(totalMarks, difficultyDistribution, questions) {
  const questionPaper = [];

  for (const difficulty in difficultyDistribution) {
    if (difficultyDistribution.hasOwnProperty(difficulty)) {
      const percentage = difficultyDistribution[difficulty];
      const marksForDifficulty = Math.floor((totalMarks * percentage) / 100);

      const filteredQuestions = questions.filter(
        (q) => q.difficulty === difficulty
      );
      const selectedQuestions = filteredQuestions.slice(0, marksForDifficulty);

      questionPaper.push(...selectedQuestions);
    }
  }

  return questionPaper;
}

module.exports = generateQuestionPaper;
