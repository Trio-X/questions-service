import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getQuestions from "../actions/getQuestions";
import axios from "axios";
const SearchBar = ({ count, setPage, page }) => {
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
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (!query) {
        setHandleChange("");
      } else if (state[0] && query.search.length > 3) {
        const currentProductID = state[0].product_id;
        var currentQuestioList = [];
        state[0].results.filter((q) => {
          if (
            q.question_body.toUpperCase().includes(query.search.toUpperCase())
          ) {
            console.log("matchii", q.question_body);
            currentQuestioList.push(q);
          }
        });
        if (currentQuestioList.length > 0) {
          dispatch(
            getQuestions({
              product_id: "11048",
              results: currentQuestioList,
            })
          );
        }
      }
    }
    return () => {
      isMounted = false;
      if (query.search.length < 3) {
        axios
          .get("http://68.183.73.106:3004/questions/q/" + page + "/" + count)
          .then(({ data }) => {
            console.log(1);
            let newData = {
              product_id: data.product_id,
              results: data.results.sort(
                (a, b) => b.question_helpfulness - a.question_helpfulness
              ),
            };
            dispatch(getQuestions(newData));
          })
          .catch((err) => console.log(err));
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
            id="search-bar-questions"
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
