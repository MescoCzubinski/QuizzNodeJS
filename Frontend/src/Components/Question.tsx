import type { Question as QuestionType, Answer as AnswerType } from "../types";

export default function Question({
  question,
  questionIndex,
  setAnswers,
  setQuestionIndex,
}: {
  question: QuestionType;
  questionIndex: number;
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[]>>;
  setQuestionIndex: (index: number) => void;
}) {
  return (
    <div key={question.id}>
      <h2>{question.question}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              setAnswers((prev) => [
                ...prev,
                { id: question.id, answer: option },
              ]);
              setQuestionIndex(questionIndex + 1);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
