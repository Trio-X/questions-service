const routerReportQuestion = require("express").Router();
const { reportQuestion } = require("../controllers/reportQuestion");
routerReportQuestion.put("/:id", reportQuestion);
module.exports.routerReportQuestion = routerReportQuestion;
