import React, { useState } from "react";
import axios from "axios";

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
  const [uploadImage, setUploadImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});
  const uploadImages = () => {
    const image = new FormData();
    image.append("file", uploadImage);
    image.append("upload_preset", "lwsk5njh");
    console.log(image);
    axios
      .post("https://api.cloudinary.com/v1_1/daakldabl/image/upload", image)
      .then(({ data }) => {
        console.log("upload", data);
        console.log("imageId", data.url);
        setUploadedImage({ photos: data.url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div id="bbb" className="modal-questionsAndAnswers">
        <form className="modal-content-questionsAndAnswers animate">
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
          <div className="ui form form-questionAndAnswers">
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
              <div className="field ">
                <div className="field uploadImage ">
                  <label>Photos</label>
                  <input
                    type="file"
                    name="photos"
                    onChange={(e) => setUploadImage(e.target.files[0])}
                    required
                  />
                  <i
                    className="icon download uploadIcon"
                    onClick={uploadImages}
                  ></i>
                </div>
              </div>
            </div>
            <div className="field btn-form-questionAndAnswers">
              <button
                className="ui basic button"
                onClick={(e) => onSubmit(e, formData, uploadedImage)}
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
