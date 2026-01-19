//Axios base config(connects to your server)
import axios from "axios";

//create a custom axios instance with a base  URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});
//add a request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //grab token from browser storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; //attach token to request headers
  }
  return config; //always return the config object
});

export default api;

//consider a response interceptor to handle errors like expired tokens
