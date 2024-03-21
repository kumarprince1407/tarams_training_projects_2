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
              <List title="Netflix Originals" param="originals" />
              <List title="Trending Now" param="trending" />
              <List title="Now playing" param="now_playing" />
              <List title="Popular" param="popular" />
              <List title="Top Rated" param="top_rated" />
              <List title="Upcoming" param="upcoming" />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
