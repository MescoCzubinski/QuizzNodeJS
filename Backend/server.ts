import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const questionsPath = path.join("./questions.json");
let data = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

app.get("/questions", (req, res) => {
  const questions = data.map(({ answer, ...rest }) => rest);
  res.json(questions);
});

app.post("/submit", (req, res) => {
  const answers = req.body;
  console.log("Received answers:", answers);

  res.json({ message: "Answers received" });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
