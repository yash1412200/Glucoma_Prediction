import axios from "axios";

const api = axios.create({
  baseURL: "https://glucoma-prediction.onrender.com",
  withCredentials: true, // REQUIRED for cookies
});

export default api;
