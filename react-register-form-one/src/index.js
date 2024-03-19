//index.js
import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <div className="footerContent">
      <footer> &copy; {new Date().getFullYear()} Tarams Technologies</footer>
    </div>
  </React.StrictMode>
  //document.getElementById("root")
);
