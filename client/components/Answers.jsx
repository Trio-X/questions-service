import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import moment from "moment";
import getAnswers from "../actions/getAnswers";
const Answers = ({
  questionId,
  setCounter,
  answerCounter,
  answerTrigger,
  setAnswerTrigger,
  report,
  answer,
  setAnswer,
}) => {
  // /**
  //  * @store {any}
  //  * @useSelector method, Hooks to get any data you wish from the redux store.
  //  * @param state
  //  * @return any key value paris from the global store. for example: {getAnswersList}
  //  */

  // const store = useSelector(({ getAnswersList }) => getAnswersList);

  /**
   * @answer {obbject}
   * @param {boolean} start with false state to wait till the we ge the data then render it.
   * @return {array of object} and save it in the global store.
   */
  const [answer, setAnswer] = useState(false);
  /**
   * @useState Hooks feature.
   * @param any
   * @param method that can assign that spesific varibale whenever you want with any time you wish.
   */
  const dispatch = useDispatch();

  /**
   * @useDispatch Hooks feature.
   * @param none we save it in a const variable so we can use it to save the data in the global store redux.
   */

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios
        .get(`/a/${questionId}/${answerCounter}`)
        .then(({ data }) => {
          let newData = {
            question: data.question,
            page: data.page,
            count: data.count,
            results: data.results.sort((a, b) => b.helpfulness - a.helpfulness),
          };
          setAnswer(newData);
          dispatch(getAnswers(newData));
        })
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, [answerCounter, answerTrigger]);
  /**
   * @useEffect Hooks feature.
   * @param callback
   * @param array, can hold any varibale you want to track or keep it null
   * if you do not want keep tracking a variable changes.
   * @return axios to fetch the answers data from the API.
   */
  const [currentAnswerId, setAnswers] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.put("/h/" + currentAnswerId);
    }
    return () => {
      setAnswerTrigger(answerTrigger + 1);
      isMounted = false;
    };
  }, [currentAnswerId, answerTrigger]);
  return (
    <div>
      {answer
        ? answer.results.map((answer) => (
            <div key={uuidv4()}>
              <h4 className="answer-list">
                A: <span className="answer-style">{answer.body}</span>
              </h4>
              <div className="btn-container">
                <div className="ui feed">
                  <div className="event">
                    <div className="content">
                      <div>
                        <div className="summary">
                          <div className="ui date summary-child">
                            By {answer.answerer_name},
                            {moment(answer.data).format("MMM Do YY")}
                          </div>
                          <div className="ui date summary-child divider-answer">
                            |
                          </div>
                          <div className="meta ui date summary-child">
                            Helpful?{" "}
                            <span
                              className="Yes-btn"
                              onClick={() => setAnswers(answer.answer_id)}
                            >
                              Yes
                            </span>
                            ({answer.helpfulness})
                          </div>
                          <div className="ui date summary-child divider-answer">
                            |
                          </div>
                          <div className="meta ui date summary-child">
                            <span
                              className="Yes-btn"
                              onClick={(e) => report(e, answer.answer_id)}
                            >
                              Report
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="extra images">
                        {answer.photos ? (
                          <div className="ui two column grid image-container">
                            {answer.photos.map((pic) => (
                              <div className="column" key={uuidv4()}>
                                <div className="ui avatar meduim image">
                                  <img src={pic.url} className="avatar" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
export default Answers;
