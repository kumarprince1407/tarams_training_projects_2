require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");
const fs = require("fs").promises; //Use promises fs module for file operations

const app = express();
const PORT = 3500;
//change
const DATA_FILE_PATH = "serverData.json"; //path to the data file

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json()); // Parse JSON requests

//Read users data from serverData.json
//let users = [];

//Get list of users
// app.get("/register", (req, res) => {
//   res.status(200).json(users);
// });

//Read users data from the file
async function readUsersData() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    //If the file doesn't exist or there is an error reading, return an empty array
    return [];
  }
}

//Write users back to the file
async function writeUsersData(users) {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.log("Error writing data in serverData.json", error);
  }
}

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    let users = await readUsersData();

    if (users.some((user) => user.username === username)) {
      return res.status(409).json({ message: "Username already taken" });
    }
    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    await writeUsersData(users);

    res.status(200).json({ message: "Registration successfull" });
  } catch (error) {
    console.log("Error during registration", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Sign-in endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let users = await readUsersData();
    // Check if the username and password match
    const user = users.find((user) => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Generate a JWT token
    const accessToken = jwt.sign(
      // { username: user.username },
      { username, password },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//protected route to get user details
app.get("/user", authenticateToken, (req, res) => {
  // res.json({ username: req.user.username });
  res.json({
    message: `Hello ${req.user.username}, welome to your dashboard!`,
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
