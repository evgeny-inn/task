import axios from 'axios';

const baseURL = 'http://localhost:8022';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
