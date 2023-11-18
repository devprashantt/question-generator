import styles from "./Question.module.scss";
import PropTypes from "prop-types";

const Question = ({ question, marks, difficulty, topic, subject }) => {
  return (
    <div className={styles.questions}>
      <div className={styles.question}>
        <h2>{question}</h2>
      </div>
      <div className={styles.data}>
        <div className={styles.marks}>
          <p>{marks}</p>
        </div>
        <div className={styles.difficulty}>
          <p>{difficulty}</p>
        </div>
        <div className={styles.topic}>
          <p>{topic}</p>
        </div>
        <div className={styles.subject}>
          <p>{subject}</p>
        </div>
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
