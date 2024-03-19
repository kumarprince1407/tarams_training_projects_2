//Router.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import HomePage from "../HomePage";
import ToDoList from "../ToDoList";
import EditPage from "../EditPage";
import ToDoFunctionalities from "../ToDoFunctionalities";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/" element={<Login />}></Route>
        <Route path="/home/:username" element={<HomePage />}></Route>
        <Route path="/add" element={<ToDoList />}></Route>
        {/* <Route path="/edit/:id" element={<EditPage />}></Route> */}
        <Route path="/edit/:username/:id" element={<EditPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
