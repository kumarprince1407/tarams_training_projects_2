//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import HomePage from "../HomePage";
import ToDoList from "../ToDoList";
import ToDoListClass from "../ToDoListClass";
import EditPageClass from "../EditPageClass";
import EditPage from "../EditPage";
import HomePageClass from "../HomePageClass";
import ToDoFunctionalities from "../ToDoFunctionalities";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        {/* TODO: Remove closing tags */}
        <Route path="/" element={<Login />} />
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/add" element={<ToDoListClass />} />
        {/* <Route path="/edit/:id" element={<EditPage />}></Route> */}
        <Route path="/edit/:username/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
