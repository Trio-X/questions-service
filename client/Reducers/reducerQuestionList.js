const initial = [];
const getQuestionsList = (state = initial, action) => {
  if (action.type === "GET_QUESTIONS_LIST") {
    return [Object.assign(action.questions)];
  } else {
    return state;
  }
};
export default getQuestionsList;
