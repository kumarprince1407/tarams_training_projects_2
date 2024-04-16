//EditPageClass.jsx
import React, { Component } from "react";
import axios from "axios";
import FormComponent from "./FormComponent";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export class EditPageClass extends Component {
  constructor(props) {
    super(props);

    //Get id and username from URL parameters - similar to useParams
    // const { id, username } = this.props.match.params;
    const { id, username } = this.props.match?.params || {};

    this.state = {
      id: id,
      username: username,
      userInput: {
        userid: "",
        title: "",
        completed: false,
        id: id,
        username: username,
      },
    };
    this.titleInputRef = React.createRef();
    this.handleFunctionClick = this.handleFunctionClick.bind(this);
  }
  componentDidMount() {
    this.fetchTaskDetails();
  }

  componentDidUpdate(prevProps, prevState) {
    const { id, username } = this.state;

    if (id !== prevState.id || username !== prevState.username) {
      this.fetchTaskDetails();
    }
  }

  fetchTaskDetails = async () => {
    const { id, username } = this.state;
    try {
      const response = await axios.get(
        `http://localhost:3002/todolist/${username}/${id}`
      );
      const data = response.data;
      console.log("Data: ", data);

      this.setState({
        userInput: {
          userid: data.userid,
          title: data.title,
          commpleted: data.completed,
          id: data.id,
          username: data.username,
        },
      });
      //Focus on the input when the data is loaded
      this.titleInputRef.current?.focus();
    } catch (error) {
      console.log("Error fetching details: ", error);
    }
  };
  //   handleButtonClick = () => {
  //     const { username } = this.state;
  //     //this.props.history.push(`/home/${username}`);
  //   };

  handleFunctionClick = async (userData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${userData.username}/${userData.id}`,
        userData
      );
      const data = response.data;
      console.log("Data: ", data);
      //this.componentDidUpdate;
      return response;
    } catch (error) {
      console.log("error updating data: ", error);
    }
  };

  render() {
    //Access parameters using props.match.params
    const { userInput } = this.state;
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
              <Link to={`/home/${this.state.username}`}>
                <Button
                  variant="contained"
                  color="success"
                  id="button"
                  //onClick={this.handleButtonClick}
                >
                  Homepage
                </Button>
              </Link>
            </div>

            <div className="mainContainer">
              <div className="inputForm">
                <h3 id="heading2">Update Task Details</h3>

                <FormComponent
                  initialUserInput={userInput}
                  handleFunctionClick={this.handleFunctionClick}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      </>
    );
  }
}

export default EditPageClass;
