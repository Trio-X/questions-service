import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const SearchBar = () => {
  /**
   * @setHandleChange method for the search bar.
   * @param query, filter the questions according the first 3 letters.
   */
  const [query, setHandleChange] = useState("");

  const state = useSelector((state) => state.getQuestionsList);

  /**
   * @useEffect Hooks feature.
   * @param callback
   * @param array, can hold any varibale you want to track or keep it null
   * if you do not want keep tracking a variable changes.
   * we use it in this case to keep tracking the query that was provided by the user.
   */

  useEffect(() => {
    console.log("Search=>", state);
    return () => {
      if (!query) {
        setHandleChange(null);
      } else {
        console.log(query);
      }
    };
  }, [query]);

  return (
    <div>
      <div className="question-title-container">
        <label className="question-title" htmlFor="question">
          QUESTIONS & ANSWERS
        </label>
      </div>
      <div className="search-bar-questions-container">
        <div className="ui active icon input search-bar-questions">
          <i className="search icon"></i>
          <input
            type="search-question "
            className="search-bar-questions"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            name="search"
            onChange={(e) =>
              setHandleChange({ [e.target.name]: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
