import styles from "./Question.module.scss";
import PropTypes from "prop-types";

const Question = ({ question, marks, difficulty, topic, subject }) => {
  return (
    <div className={styles.questions}>
      <div className={styles.question}>
        <h2>{question}</h2>
      </div>
      <div className={styles.marks}>
        <h2>{marks}</h2>
      </div>
      <div className={styles.difficulty}>
        <h2>{difficulty}</h2>
      </div>
      <div className={styles.topic}>
        <h2>{topic}</h2>
      </div>
      <div className={styles.subject}>
        <h2>{subject}</h2>
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.string,
  marks: PropTypes.number,
  difficulty: PropTypes.string,
  topic: PropTypes.string,
  subject: PropTypes.string,
};

export default Question;
