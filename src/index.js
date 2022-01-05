import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./redux/reducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./App";

import "./index.scss";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// console.log('store', store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
