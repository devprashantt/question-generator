import axios from "axios";
import { useState } from "react";

const useQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getQuestion = async (cb) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/question`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.json();

      if (cb && typeof cb === "function") {
        cb(data);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getQuestion,
  };
};

export default useQuestion;
