// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // Set default headers if needed
  },
});

export default instance;
