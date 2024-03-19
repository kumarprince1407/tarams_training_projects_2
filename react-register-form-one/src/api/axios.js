//axios.js
import axios from "axios";

export default axios.create({
  //backend will be created at this port location
  baseURL: "http://localhost:3500",
});
