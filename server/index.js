const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = process.env.PORT || 3004;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
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
