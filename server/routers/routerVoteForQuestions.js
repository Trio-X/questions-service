const routerVoteForQuestions = require("express").Router();
const { voteQuestion } = require("../controllers/voteForQuestions.js");
routerVoteForQuestions.put("/:id", voteQuestion);
module.exports.routerVoteForQuestions = routerVoteForQuestions;
