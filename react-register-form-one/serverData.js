//serverData.js
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors"); //Add CORS middleware

const app = express();

const port = 3002;

app.use(bodyParser.json());
app.use(cors()); //Enable CORS

let todolistData = [];

//Function to generate a unique random 3-digit number
const generateRandom = () => {
  let newId;

  do {
    newId = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  } while (todolistData.some((item) => item.id === newId));
  return newId;
  /*The 'some' method is an array method in JS that tests whether
    at least one element in the array passes the test implemented
    by the provided function. It returns 'true' if at least one 
    element satisfies the condition; otherwise it returns 'false'*/
};

app.get("/todolist", (req, res) => {
  res.json(todolistData);
});

//get method to update data
app.get("/todolist/:id", (req, res) => {
  //app.get("/todolist/:username/:id", (req, res) => {
  const idToFetch = parseInt(req.params.id);
  console.log("ID to fetch", idToFetch);
  const itemToFetch = todolistData.find((item) => item.id === idToFetch);

  if (itemToFetch) {
    res.json(itemToFetch);
  } else {
    res.status(404).send("Item not found");
  }
  console.log("Item to fetch:", itemToFetch);
});

//user get
app.get("/todolist/user/:username", (req, res) => {
  const usernameToFetch = req.params.username;
  const userTasks = todolistData.filter(
    (task) => task.username === usernameToFetch
  );
  res.json(userTasks);
});

//Get a particular task
app.get("/todolist/:username/:id", (req, res) => {
  const idToFetch = parseInt(req.params.id);
  const usernameToFetch = req.params.username;

  // Find the task with the specified id and username
  const itemToFetch = todolistData.find(
    (item) => item.id === idToFetch && item.username === usernameToFetch
  );

  if (itemToFetch) {
    res.json(itemToFetch);
  } else {
    res.status(404).send("Task not found");
  }
});

app.post("/todolist/:username", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);

  const username = req.params.username; //Extract username

  // Assign the counter value as the new id
  const newItem = {
    id: generateRandom(),
    username: username, //Include the username
    userid: receivedData.userid,
    title: receivedData.title,
    completed: receivedData.completed,
  };

  //Process the data or save it to a database
  todolistData.push(newItem);

  res.status(200).send("Data received successfully");
});

//app.patch("/todolist/:id/", (req, res) => {
app.patch("/todolist/:username/:id/", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  console.log("idToUpdate" + idToUpdate);
  // const { completed } = req.body;
  const usernameToUpdate = req.params.username;

  const itemToUpdate = todolistData.find(
    (item) => item.id === idToUpdate && item.username === usernameToUpdate
    // (item) => item.id === idToUpdate
  );
  console.log(
    "itemToUpdate" + itemToUpdate + "usernameToUpdate" + usernameToUpdate
  );

  if (itemToUpdate) {
    //If the item is found, update its completed status
    const { userid, title, completed } = req.body;
    itemToUpdate.userid = userid;
    itemToUpdate.title = title;
    itemToUpdate.completed = completed;
    console.log("Item to update: ", itemToUpdate);
    res.status(200).send(itemToUpdate);
  } else {
    //If the item is not found, send a 404 response
    res.status(404).send("Item not found");
  }
});

//Delete endpoint to remove an item with a specific ID
app.delete("/todolist/:id/:username", (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const usernameToDelete = req.params.username;
  //Find the inddex of the item with the secified ID
  const indexToDelete = todolistData.findIndex(
    (item) => item.id === idToDelete && item.username === usernameToDelete
  );

  if (indexToDelete !== -1) {
    // If the item is found, remove it from the array
    todolistData.splice(indexToDelete, 1);
    res.status(200).send("Data deleted successfully");
  } else {
    //If the item is not found ,send a 404 response
    res.status(404).send("Item not found");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
