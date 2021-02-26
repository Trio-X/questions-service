import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App.jsx";
import store from "./redux-store/store.js";
ReactDOM.render(<App />, document.getElementById("app"));
