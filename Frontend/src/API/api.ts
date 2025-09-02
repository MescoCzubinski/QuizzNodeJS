const API_URL = "http://localhost:5000";
import type { Answer as AnswerType } from "../types";
export const fetchQuestions = async () => {
  const response = await fetch(`${API_URL}/questions`);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

export const submitAnswers = async (answers: AnswerType[]) => {
  const response = await fetch(`${API_URL}/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  });
  if (!response.ok) {
    throw new Error("Failed to submit answers");
  }
  return response.json();
};
