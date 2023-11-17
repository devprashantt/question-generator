function generateQuestionPaper(totalMarks, difficultyDistribution, questions) {
  const questionPaper = [];

  for (const difficulty in difficultyDistribution) {
    if (difficultyDistribution.hasOwnProperty(difficulty)) {
      const percentage = difficultyDistribution[difficulty];
      const marksForDifficulty = Math.floor((totalMarks * percentage) / 100);

      // Get questions for this difficulty level
      const questionsForDifficulty = questions.filter(
        (q) => q.difficulty === difficulty
      );

      // Sort questions by marks in ascending order
      questionsForDifficulty.sort((a, b) => a.marks - b.marks);

      // Push for this difficulty level in questionPaper and sum should be less than marksForDifficulty
      let sum = 0;
      for (const question of questionsForDifficulty) {
        if (sum + question.marks <= marksForDifficulty) {
          questionPaper.push(question);
          sum += question.marks;
        }
      }

      // If sum is less than marksForDifficulty, then we need to add more questions from same level randomly
      if (sum < marksForDifficulty) {
        while (sum < marksForDifficulty) {
          // Add remainingQuestions randomly
          const randomIndex = Math.floor(
            Math.random() * questionsForDifficulty.length
          );
          const randomQuestion = questionsForDifficulty[randomIndex];
          console.log(randomQuestion);
          questionPaper.push(randomQuestion);
          sum += randomQuestion.marks;
        }
      }
    }
  }

  return questionPaper;
}

module.exports = generateQuestionPaper;
