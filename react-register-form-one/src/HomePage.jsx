// HomePage.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import ToDoList from "./ToDoList";
import { red } from "@mui/material/colors";

//import EditPage from "../components/EditPage";
// import { Puff } from "react-loader-spinner";
import { Puff } from "react-loader-spinner";

function HomePage() {
  const [toDoList, setToDoList] = useState([]);

  //To increment count of serial number
  const [newItemCounter, setNewItemCounter] = useState(0);

  //Loader
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //Extract the username from the token stored in local storage
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const username = decodedToken ? decodedToken.username : null;
  const handleLogout = () => {
    //Remove the token from local storage
    localStorage.removeItem("accessToken");

    navigate("/");
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/todolist"); //Updated URL
        const data = await response.json();
        console.log("Fetched data:", data); // Add this line

        //Filter tasks based on the username
        const userTasks = data.filter((task) => task.username === username);

        setToDoList(userTasks);
        setNewItemCounter(userTasks.length); //Set the newItemCounter based on the number of elements

        //Hide the loader after fetching the data
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username]); //Trigger the event when username changes

  //Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3002/todolist/${id}/${username}`
      );

      if (response.status === 200) {
        console.log("Data deleted successfully");

        // Fetch the updated data after deletion
        const fetchData = async () => {
          console.log("Fetching updated data...");

          try {
            const response = await axios.get(
              `http://localhost:3002/todolist/user/${username}`
            );
            const data = await response.data;
            setToDoList(data);
            setNewItemCounter(data.length);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
        // Call fetchData with the id of the deleted item

        fetchUpdateData();
      } else {
        console.log("Failed to delete data:", response.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleToggleStatus = async (id, data, username) => {
    console.log(data);
    try {
      const response = await axios.patch(
        `http://localhost:3002/todolist/${username}/${id}`, // resolve after adding username
        //`http://localhost:3002/todolist/${id}`,
        {
          ...data,
          completed: !data.completed, //Toggle the status
        }
      );

      if (response.status === 200) {
        console.log("Status toggled successfully.");

        const fetchData = async () => {
          console.log("Fetching updated data...");

          try {
            const response = await axios.get(
              "http://localhost:3002/todolist/:username"
            );
            const data = response.data;
            setToDoList(data);
            setNewItemCounter(data.length);
          } catch (error) {
            console.log("Error fetching data:", error);
          }
        };
        fetchUpdateData();
      } else {
        console.log("Failed to toggle status:", response.status);
      }
    } catch (error) {
      console.log("Error toggling status:", error);
    }
  };

  //Function to fetch updated data
  const fetchUpdateData = async () => {
    console.log("Fetching updated data...");

    try {
      const response = await axios.get(
        `http://localhost:3002/todolist/user/${username}`
      );
      //const response = await axios.get("http://localhost:3002/todolist");
      const data = response.data;
      setToDoList(data);
      setNewItemCounter(data.length);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      <React.Fragment>
        {isLoading ? (
          <Puff
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={1000} // Set the timeout to 1000 milliseconds (1 second)
          />
        ) : (
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
              {/* Form to add new ToDo */}
              <div className="mainContainer">
                <div className="displayContents">
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
                      {/* Data entered will be displayed here */}
                      {toDoList.map((listContent, index) => (
                        // <tr key={index}>
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
                                handleToggleStatus(
                                  listContent.id,
                                  listContent,
                                  listContent.username
                                )
                              }
                            />
                          </td>
                          {/* <td>{listContent.completed ? 'Yes' : 'No'}</td> */}
                          <td>
                            {/* Change */}
                            {/* <EditIcon
                        onClick={() =>
                          navigate(`/edit/${listContent.id}`, {
                            state: {
                              id: listContent.id,
                              userid: listContent.userid,
                              title: listContent.title,
                            },
                          })
                        }
                      /> */}
                            <EditIcon
                              // onClick={() => navigate(`/edit/${listContent.id}`)}//change
                              onClick={() =>
                                navigate(
                                  `/edit/${listContent.username}/${listContent.id}`
                                )
                              }
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Delete
                              onClick={() => handleDelete(listContent.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <>
              <br />
              <div className="homeButtons">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "orange", minWidth: "150px" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="contained"
                  // color="success"
                  style={{ color: "ButtonShadow" }}
                  id="button2"
                  onClick={() => navigate("/add")}
                >
                  Add New Task
                </Button>
              </div>
            </>
          </div>
        )}
      </React.Fragment>
    </>
  );
}

export default HomePage;
