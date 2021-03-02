const routerQuestionList = require("express").Router();
const { getQuestions } = require("../controllers/questionsList.js");
routerQuestionList.get("/:page/:count", getQuestions);
module.exports.routerQuestionList = routerQuestionList;
