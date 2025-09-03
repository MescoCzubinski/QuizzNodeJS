import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const questionsPath = process.env.QUESTIONS_FILE
  ? path.resolve(process.env.QUESTIONS_FILE)
  : path.join("./questions.json");
let data = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

app.get("/questions", (req, res) => {
  const questions = data.map(({ answer, ...rest }) => rest);
  res.json(questions);
});

app.post("/submit", (req, res) => {
  const answers = req.body;

  res.json({ score: checkAnswers(answers) });
});

function checkAnswers(userAnswers) {
  const userAnswersMap = {};
  for (const userAnswer of userAnswers) {
    userAnswersMap[userAnswer.id] = userAnswer.answer;
  }

  let score = 0;
  for (const { id, answer } of data) {
    if (userAnswersMap[id] === answer) {
      score++;
    }
  }
  return score;
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running at http://0.0.0.0:${PORT}`);
});
