import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // GET RANDOM QUESTION
  const getQuestion = async (cb) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/questions/random`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.data;
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.data;

      if (cb && typeof cb === "function") {
        cb(data);
        toast.success("Question fetched successfully");
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // CREATE QUESTION
  const createQuestion = async (payload, cb) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/questions/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.data;
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.data;

      if (cb && typeof cb === "function") {
        cb(data);
        toast.success("Question fetched successfully");
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // GENERATE QUESTION PAPER
  const generateQuestionPaper = async (payload, cb) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/questions/generate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.statusText !== "OK") {
        const data = await response.data;
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.data;

      console.log(data);

      if (cb && typeof cb === "function") {
        cb(data);
        toast.success("Question fetched successfully");
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // GET ALL QUESTIONS
  const getAllQuestions = async (cb) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/questions/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.data;
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.data;

      if (cb && typeof cb === "function") {
        cb(data);
        toast.success("Question fetched successfully");
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
    createQuestion,
    generateQuestionPaper,
    getAllQuestions,
  };
};

export default useQuestion;
