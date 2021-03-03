const { reportAnswer } = require("../controllers/reportAnswer");

const routerReportAnswer = require("express").Router();
const { reportAnswers } = require("../controllers/reportAnswer");
routerReportAnswer.put("/:id", reportAnswers);
module.exports.routerReportAnswer = routerReportAnswer;
