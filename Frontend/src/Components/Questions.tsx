import { fetchQuestions, submitAnswers } from "../API/api";
import { useState, useEffect } from "react";
import Question from "./Question";
import type { Question as QuestionType, Answer as AnswerType } from "../types";

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerType[]>([]);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetchQuestions();
      setQuestions(data);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    if (questionIndex === questions.length && questions.length > 0) {
      submitAnswers(answers);
    }
  }, [answers, questionIndex, questions.length]);

  return (
    <div>
      {questions[questionIndex] && (
        <Question
          question={questions[questionIndex]}
          questionIndex={questionIndex}
          setAnswers={setAnswers}
          setQuestionIndex={setQuestionIndex}
        />
      )}
    </div>
  );
}
