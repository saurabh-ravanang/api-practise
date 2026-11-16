import axios from "axios";

const api = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com",
  baseURL: "https://api.escuelajs.co/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;