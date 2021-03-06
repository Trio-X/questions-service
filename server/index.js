const express = require("express");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const compression = require("compression");
const port = process.env.PORT || 3004;
const { routerQuestionList } = require("./routers/routerQuestionsList");
const { routerAnswersList } = require("./routers/routerAnswersList");
const { routerVoteForQuestions } = require("./routers/routerVoteForQuestions");
const { routerVoteForAnswer } = require("./routers/routeVoteForAnswer");
const { routerAddAnswers } = require("./routers/routerAddAnswers");
const { routerAddaddQuestion } = require("./routers/routerAddQuestions");
const { routerReportAnswer } = require("./routers/routerReportAnswer");
const { routerReportQuestion } = require("./routers/routerReportQuestion");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const cors = require("cors");

app.use(compression());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
/**
 * applying @routerQuestionList as a middleware
 *
 * */

app.use("/questions/q", routerQuestionList);
app.use("/questions/a", routerAnswersList);
app.use("/questions/", routerVoteForQuestions);
app.use("/questions/h", routerVoteForAnswer);
app.use("/questions/addAnswers", routerAddAnswers);
app.use("/questions/addquestion", routerAddaddQuestion);
app.use("/questions/report", routerReportAnswer);
app.use("/questions/report/question", routerReportQuestion);

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
