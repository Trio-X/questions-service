/**
 * @getQuestions {action creator} for getting questions list
 * @param {any}
 * @return {object}
 *
 */
const getQuestions = (questions) => ({
  type: "GET_QUESTIONS_LIST",
  questions: questions,
});
export default getQuestions;
