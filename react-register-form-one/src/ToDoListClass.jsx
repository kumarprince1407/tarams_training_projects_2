//ToDoListClass.jsx
import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import FormComponent from "./FormComponent";
import { Button } from "@mui/material";

import { Link } from "react-router-dom";

class ToDoListClass extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("accessToken");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const username = decodedToken ? decodedToken.username : null;

    this.state = {
      username: username,
    };

    this.handleFunctionClick = this.handleFunctionClick.bind(this);
  }

  // componentDidMount() {
  //   const username = localStorage.getItem("username");
  //   if (username) {
  //     this.setState({ username });
  //   }
  // }

  handleButtonClick = () => {
    const { username } = this.state;
  };

  handleFunctionClick = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/todolist/${userData.username}`,
        userData //The userData servers as the payload or data to be sent as part of the POST request.
      );
      return response;
    } catch (error) {
      console.log("Error sending data:", error);
    }
  };
  render() {
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
              <Link to={`/home/${this.state.username}`}>
                <Button
                  variant="contained"
                  color="success"
                  id="button"
                  onClick={this.handleButtonClick}
                  style={{ width: "180px" }}
                >
                  Homepage
                </Button>
              </Link>
              <br />
              <br />
            </div>

            <div className="mainContainer">
              <div className="inputForm">
                <h3 id="heading2">Enter new Task</h3>

                <FormComponent
                  // initialUserInput={initialUserInput}
                  initialUserInput={{
                    userid: "",
                    title: "",
                    completed: false,
                    username: this.state.username,
                  }}
                  handleFunctionClick={this.handleFunctionClick}
                />
                {/* It passes the initialUserInput & handleFunctionClick as a prop to FormComponent */}
              </div>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default ToDoListClass;
