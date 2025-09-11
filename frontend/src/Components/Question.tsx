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
    <div key={question.id} className="flex flex-col gap-y-6">
      <h1># {question.question}</h1>
      <div className="flex w-full flex-col items-start gap-y-3 cursor-pointer">
        {question.options.map((option, index) => (
          <p
            key={index}
            onClick={() => {
              setAnswers((prev) => [
                ...prev,
                { id: question.id, answer: option },
              ]);
              setQuestionIndex(questionIndex + 1);
            }}
          >
            {index + 1}. {option}
          </p>
        ))}
      </div>
    </div>
  );
}
