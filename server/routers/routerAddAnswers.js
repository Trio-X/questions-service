const express = require("express");
const { addAnswer } = require("../controllers/addAnswer");
const routerAddAnswers = express.Router();
routerAddAnswers.post("/:id", addAnswer);
module.exports.routerAddAnswers = routerAddAnswers;
