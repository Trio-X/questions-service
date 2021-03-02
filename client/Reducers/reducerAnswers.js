const getAnswersList = (state = [], action) => {
  if (action.type === "GET_ANSWERS_LIST") {
    return [Object.assign(action.answers)];
  } else {
    return state;
  }
};
export default getAnswersList;
