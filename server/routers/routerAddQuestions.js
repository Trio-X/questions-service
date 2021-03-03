const express = require("express");
const { addQuestion } = require("../controllers/addQuestion");
const routerAddaddQuestion = express.Router();
routerAddaddQuestion.post("/", addQuestion);
module.exports.routerAddaddQuestion = routerAddaddQuestion;
