import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import HomeBanner from "../components/HomeBanner";
import Login from "../components/Login";
import Banner from "../components/Banner";
import List from "../components/List";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header /> <HomeBanner />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Banner />
              <List />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
