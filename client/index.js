import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import { Router } from "react-router-dom";
import history from "./history";
import App from "./App";

import { Provider } from "react-redux";
import store from "./store";

import "core-js/stable"
import "regenerator-runtime/runtime"

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
