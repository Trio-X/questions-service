import React, { useState } from "react";

const AddQuestion = ({ dis, exit, onSubmitQuestion, exitQuestion }) => {
  const [formQ, setFormQuestion] = useState({
    name: "",
    body: "",
    email: "",
  });
  const updateFormQuestion = (event) => {
    setFormQuestion({
      ...formQ,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <div id="display-question" className="modal-questionsAndAnswers">
        <form className="modal-content-questionsAndAnswers animate">
          <div className="imgcontainer">
            <span
              onClick={() => exitQuestion()}
              className="close"
              title="Close Modal"
            >
              &times;
            </span>
            <img
              src="https://images.pexels.com/photos/4989696/pexels-photo-4989696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Avatar"
              className="avatar"
            />
          </div>
          <div className="ui form form-questionAndAnswers">
            <div className="fields">
              <div className="field">
                <label>Questions</label>
                <textarea
                  onChange={(e) => updateFormQuestion(e)}
                  placeholder="Questions..."
                  type="text"
                  name="body"
                  required
                ></textarea>
              </div>
              <div className="field">
                <div className="field">
                  <label>Name</label>
                  <input
                    onChange={(e) => updateFormQuestion(e)}
                    placeholder="name..."
                    type="text"
                    name="name"
                    required
                  />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={(e) => updateFormQuestion(e)}
                    placeholder="Email address"
                    type="email"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="field btn-form-questionAndAnswers">
              <button
                className="ui basic button "
                id="btn-form-questionAndAnswers"
                onClick={(e) => onSubmitQuestion(e, formQ)}
              >
                <i className="icon pencil alternate"></i>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddQuestion;
