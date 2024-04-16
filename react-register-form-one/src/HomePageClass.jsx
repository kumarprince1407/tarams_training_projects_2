//HomePageClass.jsx
import React, { Component } from "react";

import axios from "axios";
import "./style.css";
import { Button, Checkbox } from "@mui/material";

import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ToDoList from "./ToDoList";

//import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";

import { Puff } from "react-loader-spinner";
//import { response } from "express";

class HomePageClass extends Component {
  constructor(props) {
    super(props);

    //Initializes the component's state with an object conatining 3 properties
    this.state = {
      toDoList: [],
      isLoading: true,
      username: null, //Initially set to null, it will hold the username extracted from the token stored in local storage
    };

    this.handleLogout = this.handleLogout.bind(this); //binds the 'handleLogout' method to the current instance of the class.
    //This ensures that 'this' inside 'handleLogout' refers to the component instance when the method is called
    this.fetchData = this.fetchData.bind(this); //binds the 'fetchData' method to the current instance of the class
    this.handleDelete = this.handleDelete.bind(this); //binds the 'handleDelete' method to the current instance of the class
    this.handleToggleStatus = this.handleToggleStatus.bind(this); //binds the 'handleToggleStatus' method to the current instance of the class
    this.fetchUpdatedData = this.fetchUpdatedData.bind(this); //binds the 'fetchUpdatedData' method to the current instance of the class
  }
  //Binding concept: In JS, when a method is passed as callback, its context('this' keyword) can change. By explicitly binding these methods
  //to the component instance using '.bind(this)', we ensure that 'this' within these method refers to the component instance itself, allowing
  //us to access properties and methods of the component.

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    //TODO: Get the values outside from fetchData()
    const token = localStorage.getItem("accessToken");
    const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const username = decodedToken ? decodedToken.username : null;
    //TODO: Combine fetchData() and fetchUpdatedData() into one
    axios
      .get("http://localhost:3002/todolist")
      .then((response) => {
        const data = response.data;
        const userTasks = data.filter((task) => task.username === username);

        this.setState({
          toDoList: userTasks,
          isLoading: false,
          username: username,
        });
      })
      .catch((error) => {
        //TODO - set is Loading to false in every catch block
        console.log("Error loading task data: ", error);
      });
  }

  //Functions called as methods to the object
  handleDelete(id) {
    //destructuring the 'username' property from the component's state
    const { username } = this.state;

    axios
      .delete(`http://localhost:3002/todolist/${id}/${username}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data deleted successfully");
          this.fetchUpdatedData();
        } else {
          console.log("Failed to delete data: ", response.status);
        }
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
      });
  }

  handleToggleStatus(id, data, username) {
    axios
      .patch(`http://localhost:3002/todolist/${username}/${id}`, {
        ...data,
        completed: !data.completed,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Status toggled successfully.");
          this.fetchUpdatedData();
        } else {
          console.log("Failed to toggle status: ", response.status);
        }
      });
  }

  fetchUpdatedData() {
    const { username } = this.state;
    axios
      .get(`http://localhost:3002/todolist/user/${username}`)
      .then((response) => {
        const data = response.data;
        this.setState({
          toDoList: data,
        });
      })
      .catch((error) => {
        console.log("Error fetching updated data: ", error);
      });
  }

  handleLogout() {
    localStorage.removeItem("accessToken");
    //this.props.navigate("/");
  }

  render() {
    const { isLoading, toDoList, username } = this.state;

    return (
      <>
        <div>
          <div className="fragment1">
            <div className="headingContainer">
              <h2 id="heading1">
                <span style={{ marginRight: "20px", fontSize: "60px" }}>
                  Home
                </span>
              </h2>
              <br />
              <br />
              <h1 className="homeIntro">
                {username
                  ? `Hello, ${username}! Welcome to your dashboard.`
                  : `Please Login to view your homepage`}
              </h1>
              <br />
            </div>
            <div className="mainContainer">
              <div className="displayContents">
                {isLoading ? (
                  <div className="loader-container">
                    <Puff
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      timeout={1000} // Set the timeout to 1000 milliseconds (1 second)
                    />
                  </div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Serial</th>
                        <th>Task ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <br />
                    <tbody>
                      {/* TODO : Add a check if length is not empty */}
                      {toDoList.map((listContent, index) => (
                        <tr key={listContent.id}>
                          <td>{index + 1}</td>
                          <td>{listContent.userid}</td>
                          <td>{listContent.title}</td>
                          <td>
                            <Checkbox
                              label="Completed:"
                              type="checkbox"
                              name="completed"
                              checked={listContent.completed}
                              onChange={() =>
                                this.handleToggleStatus(
                                  listContent.id,
                                  listContent,
                                  listContent.username
                                )
                              }
                            />
                          </td>
                          <td>
                            {/* <EditIcon
                                onClick={() =>
                                  this.props.navigate(
                                    `/edit/${listContent.username}/${listContent.id}`
                                  )
                                }
                              /> */}
                            <Link
                              to={`/edit/${listContent.username}/${listContent.id}`}
                            >
                              <EditIcon />
                            </Link>
                            <Delete
                              onClick={() => this.handleDelete(listContent.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
          <br />
          <div className="homeButtons">
            <Link to={`/`}>
              <Button
                variant="contained"
                style={{ backgroundColor: "orange", minWidth: "150px" }}
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </Link>
            {/* <Button
                variant="contained"
                style={{ backgroundColor: "orange", minWidth: "150px" }}
                onClick={this.handleLogout}
              >
                Logout
              </Button> */}
            <Link to={`/add`}>
              <Button
                variant="contained"
                style={{ color: "ButtonShadow" }}
                id="button2"
              >
                Add new task
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}
export default HomePageClass;
//export default withRouter(HomePageClass);
