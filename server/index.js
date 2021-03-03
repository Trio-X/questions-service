const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const { routerQuestionList } = require("./routers/routerQuestionsList");
const { routerAnswersList } = require("./routers/routerAnswersList");
const { routerVoteForQuestions } = require("./routers/routerVoteForQuestions");
const { routerVoteForAnswer } = require("./routers/routeVoteForAnswer");
const { routerAddAnswers } = require("./routers/routerAddAnswers");
const { routerAddaddQuestion } = require("./routers/routerAddQuestions");
const { routerReportAnswer } = require("./routers/routerReportAnswer");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
/**
 * applying @routerQuestionList as a middleware
 *
 * */
app.use("/q", routerQuestionList);
app.use("/a", routerAnswersList);
app.use("/", routerVoteForQuestions);
app.use("/h", routerVoteForAnswer);
app.use("/addAnswers", routerAddAnswers);
app.use("/addquestion", routerAddaddQuestion);
app.use("/report", routerReportAnswer);

// the function below is just an example...
/**
 * @function addition
 * @param {number} a - the first number
 * @param {number} b - the second number
 * @return {number} the sum of the two numbers
 */
const addition = (a, b) => {
  return a + b;
};
// the function above is just an example...

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
