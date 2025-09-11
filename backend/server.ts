import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT ?? 5000);
const URL = process.env.URL;

app.use(cors({ origin: URL }));
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
