// EditPage.jsx
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./style.css";
import { Button, InputBase } from "@mui/material";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import FormComponent from "./FormComponent";

function EditPage() {
  //Change
  const location = useLocation();

  const { id, username } = useParams();

  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
    id: id,
    username: username,
  });

  //Create a ref for Textfield input
  const titleInputRef = useRef(null);

  const handleButtonClick = () => {
    navigate(`/home/${username}`);
  };

  const handleFunctionClick = async (userData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${userData.username}/${userData.id}`,
        userData //The userData servers as the payload or data to be sent as part of the PATCH request.
      );
      return response;
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  //Fetch the tasks for the given id
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/todolist/${username}/${id}`
        );
        const data = response.data;
        console.log("Data:", data);
        setUserInput({
          userid: data.userid,
          title: data.title,
          completed: data.completed,
          id: data.id, //update id
          username: data.username, //update username
        }); //Set the task details to userInput state

        //Focus on the title input when data is loaded
        titleInputRef.current?.focus(); //Use optional chaining here
      } catch (error) {
        console.log("error fetching details:", error);
      }
    };
    fetchTaskDetails();
  }, [id, username]); //dependencies of UseEffect

  return (
    <>
      <React.Fragment>
        <div className="fragment1">
          <div className="headingContainer">
            <h2 id="heading1">
              {" "}
              <span style={{ marginRight: "20px", fontSize: "60px" }}>
                Edit Task
              </span>
            </h2>
            <Button
              variant="contained"
              color="success"
              id="button"
              onClick={handleButtonClick}
            >
              Homepage
            </Button>
          </div>

          <div className="mainContainer">
            <div className="inputForm">
              <h3 id="heading2">Update Task Details</h3>

              <FormComponent
                initialUserInput={userInput}
                handleFunctionClick={handleFunctionClick}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default EditPage;
