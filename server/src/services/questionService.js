const fs = require("fs");
const path = require("path");
const Question = require("../models/question");

class QuestionService {
  constructor() {
    this.questionStorePath = path.join(
      __dirname,
      "../../data/questionStore.json"
    );
  }

  getAllQuestions() {
    const rawData = fs.readFileSync(this.questionStorePath);
    const questions = JSON.parse(rawData);
    return questions.map(
      (q) => new Question(q.question, q.subject, q.topic, q.difficulty, q.marks)
    );
  }
}

module.exports = QuestionService;
