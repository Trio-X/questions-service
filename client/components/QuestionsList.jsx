import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import AddAnswer from "./AddAnswer.jsx";
import Answers from "./Answers.jsx";
const QuestionsList = ({ setCount, setAnswer, setPage, count }) => {
  /**
   * @store {any}
   * @useSelector method, Hooks to get any data you wish from the redux store.
   * @param state
   * @return any key value paris from the global store. for example: {getQuestionsList}
   */
  const [answerTrigger, setAnswerTrigger] = useState(0);

  const [answerCounter, setCounter] = useState(2);

  const state = useSelector((state) => state.getQuestionsList);
  console.log(state);
  const [currentQuestionId, setQestionId] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.put("/" + currentQuestionId);
    }
    return () => {
      isMounted = false;
      setAnswerTrigger(answerTrigger + 1);
    };
  }, [currentQuestionId, answerTrigger]);
  // add answers pop up component
  const dis = () => {
    document.getElementById("bbb").style.display = "block";
  };
  const exit = () => {
    document.getElementById("bbb").style.display = "none";
  };

  const [onSubmitFormForAddQuestion, setOnSubmitFormForAddQuestion] = useState(
    {}
  );

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/addAnswers/" + currentQuestionId, { t: "helllo its fakhri" })
      .then(({ data }) => {
        console.log(data);
      });
    console.log("clickedOn ");
  };
  return (
    <div>
      <div>
        {state.length > 0
          ? state[0].results.map((Q) => {
              return (
                <div key={uuidv4()}>
                  <div className="helpful-question">
                    <h4
                      id="questions"
                      className="question-questions"
                      htmlFor="Q"
                    >
                      Q: {Q.question_body}
                    </h4>
                    <div id="help-container" className="summary">
                      <div className="meta ui date summary-child">
                        Helpful?
                        <span
                          className="Yes-btn"
                          onClick={() => setQestionId(Q.question_id)}
                        >
                          Yes ({Q.question_helpfulness})
                        </span>
                      </div>
                      <div className="ui date summary-child divider-answer">
                        |
                      </div>
                      <div
                        className="meta ui date summary-child"
                        onClick={() => setQestionId(Q.question_id)}
                      >
                        <span className="Yes-btn" onClick={() => dis()}>
                          Add Answer
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="answers-container">
                    <Answers
                      questionId={Q.question_id}
                      setAnswer={setAnswer}
                      answerCounter={answerCounter}
                      setCounter={setCounter}
                      answerTrigger={answerTrigger}
                      setAnswerTrigger={setAnswerTrigger}
                    />
                  </div>
                </div>
              );
            })
          : null}
        {state[0] ? (
          count === state[0].results.length ? (
            <h5
              className="question-questions"
              id="load-more-btn"
              onClick={() => setCount(count + 2)}
            >
              LOAD MORE ANSWERS
            </h5>
          ) : null
        ) : null}
      </div>
      <div className="btn-container">
        {state[0] ? (
          count === state[0].results.length ? (
            <button
              className="ui basic button"
              onClick={() => setCount(count + 2)}
            >
              MORE ANSWERED QUESTIONS
            </button>
          ) : null
        ) : null}
        <button className="ui basic button">
          ADD A QUESTION <i className="plus icon iconn"></i>
        </button>
      </div>
      <div>
        <AddAnswer dis={dis} exit={exit} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
export default QuestionsList;
