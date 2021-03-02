/**
 * @getAnswers {action creator} for getting answers
 * @param {any}
 * @return {object}
 *
 */
const getAnswers = (answers) => ({
  type: "GET_ANSWERS_LIST",
  answers: answers,
});
export default getAnswers;
