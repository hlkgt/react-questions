const express = require("express");
const app = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "api.json");

function readQuestions() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

app.get("/questions", (req, res) => {
  const questions = readQuestions();
  res.send(questions);
});

module.exports = app;
