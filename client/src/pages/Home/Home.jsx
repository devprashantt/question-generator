import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import useQuestions from "../../api/useQuestion";

import { Input, Button, Question } from "../../components";

const Home = () => {
  const { generateQuestionPaper, loading } = useQuestions();

  const [formData, setFormData] = useState({
    totalMarks: 100,
    difficultyDistribution: {
      Easy: 50,
      Medium: 30,
      Hard: 20,
    },
  });

  const [questionPaperData, setQuestionPaperData] = useState([]);

  const handleGenerateQuestionPaper = () => {
    generateQuestionPaper(formData, (responseData, error) => {
      if (error) {
        console.log(error);
      } else {
        setQuestionPaperData(responseData);
      }
    });
  };

  useEffect(() => {
    handleGenerateQuestionPaper();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.inputs}>
        <div className={styles.total}>
          <p>Total marks</p>
          <Input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={(e) =>
              setFormData({ ...formData, totalMarks: e.target.value })
            }
          />
        </div>
        <div className={styles.diffs}>
          {/* INPUT FOR EACH EASY MEDIUM HARD */}
          <div className={styles.diff}>
            <p>Easy</p>
            <Input
              type="number"
              name="easy"
              value={formData.difficultyDistribution.Easy}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficultyDistribution: {
                    ...formData.difficultyDistribution,
                    Easy: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className={styles.diff}>
            <p>Medium</p>
            <Input
              type="number"
              name="medium"
              value={formData.difficultyDistribution.Medium}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficultyDistribution: {
                    ...formData.difficultyDistribution,
                    Medium: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className={styles.diff}>
            <p>Hard</p>
            <Input
              type="number"
              name="hard"
              value={formData.difficultyDistribution.Hard}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  difficultyDistribution: {
                    ...formData.difficultyDistribution,
                    Hard: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className={styles.button}>
          <Button
            text={
              loading
                ? "Generating question paper..."
                : "Generate question paper"
            }
            onClick={handleGenerateQuestionPaper}
          />
        </div>
      </div>
      <div className={styles.paper}>
        {questionPaperData?.questions?.map((questionData, index) => {
          return (
            <Question
              key={index}
              question={questionData.question}
              marks={questionData.marks}
              difficulty={questionData.difficulty}
              topic={questionData.topic}
              subject={questionData.subject}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
