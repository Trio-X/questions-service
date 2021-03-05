import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import AddAnswer from "./AddAnswer.jsx";
import Answers from "./Answers.jsx";
import AddQuestion from "./AddQuestions.jsx";
import swal from "sweetalert";

const QuestionsList = ({ setCount, setAnswer, setPage, count }) => {
  /**
   * @store {any}
   * @useSelector method, Hooks to get any data you wish from the redux store.
   * @param state
   * @return any key value paris from the global store. for example: {getQuestionsList}
   */
  const state = useSelector((state) => state.getQuestionsList);
  console.log(state);

  /**
   *
   */
  const [answerTrigger, setAnswerTrigger] = useState(0);

  /**
   * Showing Answers below each questions
   * @setCounter a hook method sets the value of @answerCounter
   *
   */
  const [answerCounter, setCounter] = useState(2);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.get(
        `http://68.183.73.106:3004/questions/a/${currentQuestionId}/${answerCounter}`
      );
    }
    return () => {
      isMounted = false;
      setAnswerTrigger(answerTrigger + 1);
    };
  }, [answerCounter, answerTrigger]);

  /**
   * @setQestionId a hook method sets the value @currentQuestionId call it whenever you want to increment the count number of the questions
   */
  const [currentQuestionId, setQestionId] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      axios.put("http://68.183.73.106:3004/questions/" + currentQuestionId);
    }
    return () => {
      isMounted = false;
      setAnswerTrigger(answerTrigger + 1);
    };
  }, [currentQuestionId, answerTrigger]);
  /**
   * @dis a function that display the modal of adding an answer and it wil pop up component addAnswer.
   * @param none
   *
   */
  const dis = () => {
    document.getElementById("bbb").style.display = "block";
  };
  /**
   * @exit a function that display the modal of adding an answer and it wil pop out component addAnswer.
   * @param none
   *
   */
  const exit = () => {
    document.getElementById("bbb").style.display = "none";
  };

  /**
   * @displayQuestion a function that display the modal of adding an Question and it wil pop up component addQuestion.
   * @param none
   *
   */
  const displayQuestion = () => {
    document.getElementById("display-question").style.display = "block";
  };

  /**
   * @exitQuestion a function that display the modal of adding an Question and it wil pop out component addQuestion.
   * @param none
   *
   */

  const exitQuestion = () => {
    document.getElementById("display-question").style.display = "none";
  };

  /**
   * @formQuestion a varibale create by hooks feature
   */
  const [formQuestion, setFormQuestion] = useState({});

  /**
   * @onSubmitQuestion
   * @param {event} e
   * @param {*object} newData is a return object of a child component
   *
   */
  const onSubmitQuestion = (e, newData) => {
    e.preventDefault();
    axios
      .post("http://68.183.73.106:3004/questions/addquestion/", {
        body: newData.body,
        email: newData.email,
        name: newData.name,
        product_id: state[0].product_id,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    console.log("clickedOn", state[0].product_id);
  };

  /**
   *
   * @param {event} e
   * @param {*objects} newData containing the data that is collecteted from the add form question
   * @returns submit a post
   */
  const onSubmit = (e, newData) => {
    e.preventDefault();
    axios
      .post(
        "http://68.183.73.106:3004/questions/addAnswers/" + currentQuestionId,
        newData
      )
      .then(({ data }) => {
        console.log(data);
      });
    console.log("clickedOn ");
  };

  const report = (e, answerId) => {
    e.preventDefault();
    console.log("clicked", answerId);
    axios
      .put("http://68.183.73.106:3004/questions/report/" + answerId)
      .then(({ data }) => {
        console.log(data);
        swal("Good job!", "The report has been sent!", "success");
      })
      .catch((err) => console.log(err));
  };

  // report question function
  const reportQuestion = (e, question_id) => {
    e.preventDefault();
    console.log("clicked", question_id);
    axios
      .put("http://68.183.73.106:3004/questions/report/question/" + question_id)
      .then(({ data }) => {
        console.log(data);
        swal("Good job!", "The report has been sent!", "success");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="service3-container">
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
                      <div className="meta ui date summary-child">
                        <span
                          className="Yes-btn"
                          onClick={(e) => reportQuestion(e, Q.question_id)}
                        >
                          Report
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="answers-container">
                    <Answers
                      questionId={Q.question_id}
                      answerCounter={answerCounter}
                      setCounter={setCounter}
                      answerTrigger={answerTrigger}
                      setAnswerTrigger={setAnswerTrigger}
                      report={report}
                    />
                  </div>
                </div>
              );
            })
          : null}
        {state[0] ? (
          answerCounter < state[0].results.length &&
          count === state[0].results.length ? (
            <h5
              className="question-questions"
              id="load-more-btn"
              onClick={() => setCounter(answerCounter + 2)}
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
        <button className="ui basic button" onClick={displayQuestion}>
          ADD A QUESTION <i className="plus icon iconn"></i>
        </button>
      </div>
      <div className="service3-bottom">
        <AddAnswer dis={dis} exit={exit} onSubmit={onSubmit} />
      </div>
      <div>
        <AddQuestion
          formQuestion={formQuestion}
          onSubmitQuestion={onSubmitQuestion}
          displayQuestion={displayQuestion}
          exitQuestion={exitQuestion}
        />
      </div>
    </div>
  );
};
export default QuestionsList;
