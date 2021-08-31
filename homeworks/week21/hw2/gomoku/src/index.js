import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";

const theme = {
  squareSize: 30,
  maxBoardSize: 19,
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
