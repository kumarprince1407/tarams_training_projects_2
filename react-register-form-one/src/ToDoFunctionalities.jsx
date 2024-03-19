import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";
import { Button, InputBase } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function ToDoFunctionalities() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    userid: "",
    title: "",
    completed: false,
  });

  //State for form validation
  const [formValid, setFormValid] = useState(true);

  //Extract the username from the token stored in local storage
  const token = localStorage.getItem("accessToken"); //It retrives the value associated with the key
  //"accessToken" from the browser's local storage & stores it in the variable named "token"
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
  //token.split(".")[1] splits the token into an array using the dot('.') as a separator and selects
  //2nd element (index 1) of the resulting array

  //Get the username from the decoded token
  const username = decodedToken ? decodedToken.username : null;

  //Create a ref for TextInput field
  const titleInputRef = useRef(null);

  useEffect(() => {
    // Fetch data if editing a task
    if (location.pathname.startsWith("/edit")) {
      fetchData();
    }
  }, [location]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/todolist/${username}/${id}`
      );
      const data = response.data;
      setUserInput({
        userid: data.userid,
        title: data.title,
        completed: data.completed,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setUserInput((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      ...userInput,
      username: username,
    };

    try {
      let response;
      if (location.pathname.startsWith("/edit")) {
        response = await axios.patch(
          `http://localhost:3002/todolist/${username}/${id}`,
          newItem
        );
      } else {
        response = await axios.post(
          `http://localhost:3002/todolist/${username}`,
          newItem
        );
      }

      if (response.status === 200) {
        console.log("Data sent successfully");
        navigate(`/home/${username}`);
      } else {
        console.error("Failed to send data:", response.status);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="inputForm">
          <h3 id="heading2">
            {location.pathname.startsWith("/edit")
              ? "Update Task Details"
              : "Enter new Task"}
          </h3>

          <form onSubmit={handleFormSubmit}>
            <label htmlFor="textarea1">
              <br />
              <p>
                {location.pathname.startsWith("/edit")
                  ? "Update task ID"
                  : "Task ID"}
              </p>
              <input
                className="inputfield"
                type="text"
                name="userid"
                value={userInput.userid}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <label htmlFor="textarea3">
              <br />
              <p>
                {location.pathname.startsWith("/edit")
                  ? "Update task details"
                  : "Task details"}
              </p>
              <input
                className="inputfield"
                type="text"
                name="title"
                value={userInput.title}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <div className="buttonContainer">
              <button type="submit">
                {location.pathname.startsWith("/edit")
                  ? "Update & Save"
                  : "Add New Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ToDoFunctionalities;
