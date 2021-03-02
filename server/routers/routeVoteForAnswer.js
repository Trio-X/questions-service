const routerVoteForAnswer = require("express").Router();
const { voteAnswer } = require("../controllers/voteForAnswer.js");
routerVoteForAnswer.put("/:id", voteAnswer);
module.exports.routerVoteForAnswer = routerVoteForAnswer;
