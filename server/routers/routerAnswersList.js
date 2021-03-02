const express = require("express");
const routerAnswersList = express.Router();
const { getAnswers } = require("../controllers/Answers.js");
routerAnswersList.get("/:question_id/:count", getAnswers);
module.exports.routerAnswersList = routerAnswersList;
