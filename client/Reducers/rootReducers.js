import { combineReducers } from "redux";
import getQuestionsList from "./reducerQuestionList.js";
import getAnswersList from "./reducerAnswers.js";
const rootReducer = combineReducers({ getQuestionsList, getAnswersList });
export default rootReducer;
