import SearchBar from "./SearchBar.jsx";
import QuestionsList from "./QuestionsList.jsx";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import getQuestions from "../actions/getQuestions";

const App = () => {
  /**
   * @useState Hooks feature.
   * @param any
   * @param method that can assign that spesific varibale whenever you want with any time you wish.
   */

  const [page, setPage] = useState(1);
  /**
   * @questions {empty array}
   * @param {array} start with empty array to wait till the we ge the data then render it.
   * @return {array of object} and save it in the global store.
   */

  const [count, setCount] = useState(6);
  /**
   * @useDispatch Hooks feature.
   * @param none we save it in a const variable so we can use it to save the data in the global store redux.
   */

  const dispatch = useDispatch();

  const getDataQuestions = () => {
    // http://68.183.73.106:3004
    axios
      .get("http://68.183.73.106:3004/questions/q/" + page + "/" + count)
      .then(({ data }) => {
        console.log(data);
        let newData = {
          product_id: data.product_id,
          results: data.results.sort(
            (a, b) => b.question_helpfulness - a.question_helpfulness
          ),
        };
        dispatch(getQuestions(newData));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getDataQuestions();
    }
    return () => {
      isMounted = false;
    };
  }, [page, count]);

  return (
    <div className="app-container">
      <div>
        <SearchBar
          setPage={setPage}
          count={count}
          page={page}
          getDataQuestions={getDataQuestions}
        />
      </div>
      <div>
        <QuestionsList
          setCount={setCount}
          setPage={setPage}
          count={count}
          getDataQuestions={getDataQuestions}
        />
      </div>
    </div>
  );
};
export default App;
