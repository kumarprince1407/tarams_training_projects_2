// FormComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function FormComponent({ initialUserInput, handleFunctionClick }) {
  //{initialUserInput, handleFunctionClick} is a destructured obj that reprents the props passed to the component
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({}); //check - don't set prop as a state initial value
  const [formValid, setFormValid] = useState(true);

  //the useEffect hook is used to handle updates to the initialUserInput prop
  useEffect(() => {
    // Update userInput state when initialUserInput changes with the updated initialUserInput
    setUserInput(initialUserInput);
  }, [initialUserInput]);

  const handleInputChange = (e) => {
    //'e' is the event object representing the change event that occurred on the input field.
    //'e.target' refers to the element that triggred the event, in this case, the input field
    const { name, value } = e.target; // It destructures the 'name' and 'value' properties from the input field.

    //It receives the prevState as an argument and returns a new state
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value, //Using [] bracket is a dynamic way
    }));
  };

  /*({...prevState, [name]: inputValue}): this syntax is used to create a new object
  by spreading the properties of the previous state(prevState) and addind/modifying the property
  specified by '[name]' with the value of 'inputValue'*/

  /*If we don't use the spread operator ('...prevState') and just set the state directly then it will
  replace the entire state with a new object containing only the property '[name]' and its corresponding
   value 'inputValue'. And we will lose all other properties except the one being updated*/

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (userInput.userid.trim() === "" || userInput.title.trim() === "") {
      setFormValid(false);
      return;
    }

    setFormValid(true);

    //The 'handleFunctionClick' is a function that is passed to the 'FormComponent' component as a prop
    //When handleFunctionClick is called in 'FormComponent', it sends an async request to the server with userData(in this case 'userInput') as its payload
    const response = await handleFunctionClick(userInput); //The userInput contains the data entered/edited by the user in the form
    //The execution of the code should pause until the asynchronous 'handleFunctionClick' function returns a response

    /*

*/

    //Once the response is received, it is stored in the response variable

    /* The 'handleFunctionClick' function defined in 'ToDolist.jsx' and 'EditPage.jsx' is invoked from
       'FormComponent.jsx' to perform some action related to the ToDoList or EditPage, and the response
       (either success or error) from this action is captured in the 'response' variable in FormComponent.jsx*/

    console.log("Form component response: ", response);

    if (response.status === 200) {
      console.log("Data sent successfully");
      navigate(`/home/${userInput.username}`); //navigate comes only after above operations are performed successfully.
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
          // Bind input fields to state variable userInput and event handles 'handleInputchange'
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
