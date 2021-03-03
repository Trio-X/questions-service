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
  const displayQuestion = () => {
    document.getElementById("display-question").style.display = "block";
  };
  const exitQuestion = () => {
    document.getElementById("display-question").style.display = "none";
  };
  const [formQuestion, setFormQuestion] = useState({});
  const onSubmitQuestion = (e, newData) => {
    e.preventDefault();
    axios
      .post("/addquestion/", {
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
    axios.post("/addAnswers/" + currentQuestionId, newData).then(({ data }) => {
      console.log(data);
    });
    console.log("clickedOn ");
  };

  const report = (e, answerId) => {
    e.preventDefault();
    console.log("clicked", answerId);
    axios
      .put("/report/" + answerId)
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
      .put("/report/question/" + question_id)
      .then(({ data }) => {
        console.log(data);
        swal("Good job!", "The report has been sent!", "success");
      })
      .catch((err) => console.log(err));
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
                      setAnswer={setAnswer}
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
      <div>
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
