//server.js
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors"); //Add CORS middleware

const app = express();

const port = 3004;

app.use(bodyParser.json());
app.use(cors()); //Enable CORS

let todolistData = [
  { id: 101, userid: "harryPotter", title: "Task", completed: false },
  { id: 201, userid: "sheldonCooper", title: "Task 2", completed: true },
  { id: 301, userid: "paulWalker", title: "Task 3", completed: false },
];

//Function to generate a unique randm 3-digit number
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

app.get("/todolist/", (req, res) => {
  res.json(todolistData);
});

//get method to update data
app.get("/todolist/:id", (req, res) => {
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

app.post("/todolist", (req, res) => {
  const receivedData = req.body;
  console.log("Received data:", receivedData);

  // Assign the counter value as the new id
  const newItem = {
    //id: todolistData.length + 1, // Use the length of the array as the new ID
    //Change
    //id: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    id: generateRandom(),
    userid: receivedData.userid,
    title: receivedData.title,
    completed: receivedData.completed,
  };

  //Process the data or save it to a database
  todolistData.push(newItem);

  res.status(200).send("Data received successfully");
});

app.patch("/todolist/:id", (req, res) => {
  const idToUpdate = parseInt(req.params.id);
  // const { completed } = req.body;

  const itemToUpdate = todolistData.find((item) => item.id === idToUpdate);

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
app.delete("/todolist/:id", (req, res) => {
  const idToDelete = parseInt(req.params.id);

  //Find the inddex of the item with the secified ID
  const indexToDelete = todolistData.findIndex(
    (item) => item.id === idToDelete
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
