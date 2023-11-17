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

  getRandomQuestion() {
    const rawData = fs.readFileSync(this.questionStorePath);
    const questions = JSON.parse(rawData);
    const randomIndex = Math.floor(Math.random() * questions.length);
    return new Question(
      questions[randomIndex].question,
      questions[randomIndex].subject,
      questions[randomIndex].topic,
      questions[randomIndex].difficulty,
      questions[randomIndex].marks
    );
  }

  getAllQuestions() {
    const rawData = fs.readFileSync(this.questionStorePath);
    const questions = JSON.parse(rawData);
    return questions.map(
      (q) => new Question(q.question, q.subject, q.topic, q.difficulty, q.marks)
    );
  }

  createQuestion(question, subject, topic, difficulty, marks) {
    const rawData = fs.readFileSync(this.questionStorePath);
    const questions = JSON.parse(rawData);
    const newQuestion = new Question(
      question,
      subject,
      topic,
      difficulty,
      marks
    );
    questions.push(newQuestion);
    fs.writeFileSync(this.questionStorePath, JSON.stringify(questions));
    return newQuestion;
  }
}

module.exports = QuestionService;
