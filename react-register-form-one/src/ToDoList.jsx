// ToDoList.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";

//change
import FormComponent from "./FormComponent";
function ToDoList() {
  const navigate = useNavigate();
  //Extract the username from the token stored in local storage
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

  //Get the username from the decoded token
  const username = decodedToken ? decodedToken.username : null;

  //change
  // const [newItemCounter, setNewItemCounter] = useState(0);

  const handleButtonClick = () => {
    navigate(`/home/${username}`);
  };

  const initialUserInput = {
    userid: "",
    title: "",
    completed: false,
    username: username, //Set the username here
  };

  const handleFunctionClick = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/todolist/${userData.username}`,
        userData
      );
      return response;
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };

  return (
    <>
      <React.Fragment>
        <div className="fragment1">
          <div className="headingContainer">
            <h2 id="heading1">
              {" "}
              <span style={{ marginRight: "20px", fontSize: "60px" }}>
                ToDo List
              </span>
            </h2>
            <br />

            <Button
              variant="contained"
              color="success"
              id="button"
              onClick={handleButtonClick}
              style={{ width: "180px" }}
            >
              Homepage
            </Button>
            <br />
            <br />
          </div>

          <div className="mainContainer">
            <div className="inputForm">
              <h3 id="heading2">Enter new Task</h3>

              <FormComponent
                initialUserInput={initialUserInput}
                handleFunctionClick={handleFunctionClick}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default ToDoList;
