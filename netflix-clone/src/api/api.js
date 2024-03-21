//api.js
import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "3c4d0249b5a88f850f5346026362f5e1";

//list URLs
const endpoints = {
  originals: "/discover/tv",
  trending: "/trending/all/week",
  now_playing: "/movie/now_playing",
  popular: "/movie/popular",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};
export const fetchData = (param) => {
  return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`);
};
