import axios from "axios";

const BASE_URL = "http://localhost:8000";

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

export default axiosInstance;
