//App.js
import "./App.scss";
import React from "react";
import Header from "./components/Header";
import HomeBanner from "./components/HomeBanner";
import Login from "./components/Login";
import Banner from "./components/Banner";
import List from "./components/List";
import Router from "./router/Router";

function App() {
  return (
    <React.Fragment>
      {/* <Header />
      <HomeBanner /> */}
      {/* <Login /> */}
      {/* <Banner /> */}
      {/* <List /> */}
      <Router />
    </React.Fragment>
  );
}

export default App;
