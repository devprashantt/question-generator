import { useEffect, useState } from "react";

import useQuestions from "../../api/useQuestion";

import { Input, Button } from "../../components";

const Home = () => {
  const { generateQuestionPaper } = useQuestions();

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
        console.log(responseData);
      }
    });
  };

  useEffect(() => {
    handleGenerateQuestionPaper();
  }, []);

  return (
    <div>
      <div>
        <div>
          <Input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={(e) =>
              setFormData({ ...formData, totalMarks: e.target.value })
            }
          />
        </div>
        <div>
          {/* INPUT FOR EACH EASY MEDIUM HARD */}
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
        <div>
          <Button
            text="Generate Question Paper"
            onClick={handleGenerateQuestionPaper}
          />
        </div>
      </div>
      <div>
        {questionPaperData?.questions?.map((questionData, index) => {
          return (
            <div key={index}>
              <div>{questionData.question}</div>
              <div>{questionData.difficulty}</div>
              <div>{questionData.marks}</div>
              <div>{questionData.topic}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;