import { fetchQuestions, submitAnswers } from "../API/api";
import { useState, useEffect } from "react";
import Question from "./Question";
import type { Question as QuestionType, Answer as AnswerType } from "../types";

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    async function submitScore() {
      if (questionIndex === questions.length && questions.length > 0) {
        const res = await submitAnswers(answers);
        setScore(res.score);
      }
    }
    submitScore();
  }, [questionIndex, questions.length, answers]);

  return (
    <div className="max-w-1/2 h-fit">
      {questions[questionIndex] && (
        <Question
          question={questions[questionIndex]}
          questionIndex={questionIndex}
          setAnswers={setAnswers}
          setQuestionIndex={setQuestionIndex}
        />
      )}
      {score !== null && <h1>Your score: {score}</h1>}
    </div>
  );
}
