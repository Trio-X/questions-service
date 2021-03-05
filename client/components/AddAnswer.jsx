import React, { useState } from "react";

const AddAnswer = ({ dis, exit, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
    email: "",
    photos: "",
  });

  const updateFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };

  return (
    <div>
      <div id="bbb" className="modal">
        <form className="modal-content animate">
          <div className="imgcontainer">
            <span onClick={() => exit()} className="close" title="Close Modal">
              &times;
            </span>
            <img
              src="https://i.imgur.com/dGo8DOk.jpg"
              alt="Avatar"
              className="avatar"
            />
          </div>
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <label>Add Answer</label>
                <input
                  onChange={(e) => updateFormData(e)}
                  placeholder="Answer..."
                  type="text"
                  name="body"
                  required
                />
              </div>
              <div className="field">
                <div className="field">
                  <label>Name</label>
                  <input
                    onChange={(e) => updateFormData(e)}
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
                    onChange={(e) => updateFormData(e)}
                    placeholder="Email address"
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="field">
                  <label>Photos</label>
                  <input
                    type="text"
                    placeholder="photos.."
                    name="photos"
                    onChange={(e) => updateFormData(e)}
                    placeholder="photos link..."
                    required
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <button
                className="ui basic button"
                onClick={(e) => onSubmit(e, formData)}
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
export default AddAnswer;
