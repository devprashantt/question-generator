import styles from "./Question.module.scss";
import PropTypes from "prop-types";
import { useState } from "react";

import Modal from "../Modal/Modal";

const Question = ({ question, marks, difficulty, topic, subject }) => {
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <>
      <div
        className={styles.questions}
        onClick={() => {
          setIsModalActive(true);
        }}
      >
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

      <Modal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
      />
    </>
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
