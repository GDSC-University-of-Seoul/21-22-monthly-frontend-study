import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import counterReducer from "./modules/counter";
import { createStore } from "redux";
import { Provider } from "react-redux";

/* 스토어 만들기 */
const store = createStore(counterReducer);

/* App 컴포넌트를 'Provider'로 감싸면 모든 컴포넌트가 리덕스 store에 접근할 수 있다 */
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
