// FormComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function FormComponent({ initialUserInput, handleFunctionClick }) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState(initialUserInput);
  const [formValid, setFormValid] = useState(true);

  //change
  useEffect(() => {
    // Update userInput state when initialUserInput changes
    setUserInput(initialUserInput);
  }, [initialUserInput]);

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

    if (userInput.userid.trim() === "" || userInput.title.trim() === "") {
      setFormValid(false);
      return;
    }

    setFormValid(true);
    //try-catch block removed
    let response = await handleFunctionClick(userInput);
    if (response.status === 200) {
      console.log("Data sent successfully");
      navigate(`/home/${userInput.username}`);
    } else {
      console.log("failed to send data:", response.status);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <p>Task ID:</p>
        <TextField
          type="text"
          name="userid"
          value={userInput.userid}
          onChange={handleInputChange}
          sx={{ width: "150%" }}
        />
      </label>
      <br />
      <br />
      <label>
        <p>Task details:</p>
        <TextField
          type="text"
          name="title"
          value={userInput.title}
          onChange={handleInputChange}
          sx={{ width: "150%" }}
        />
      </label>
      <br />
      {!formValid && (
        <p style={{ color: "red", marginTop: "5px" }}>
          Please fill in all the fields.
        </p>
      )}
      <br />
      <div className="buttonContainer">
        <Button variant="contained" color="success" type="submit">
          {initialUserInput.id ? "Update & Save" : "Add New Task"}
        </Button>
      </div>
    </form>
  );
}

export default FormComponent;
