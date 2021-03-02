const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const { routerQuestionList } = require("./routers/routerQuestionsList");
const { routerAnswersList } = require("./routers/routerAnswersList");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
/**
 * applying @routerQuestionList as a middleware
 *
 * */
app.use("/q", routerQuestionList);
app.use("/a", routerAnswersList);
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
