import axios from 'axios';

// const host = '192.168.15.173';
const host = 'localhost';
const port = 3333;

const api = axios.create({
  baseURL: `http://${host}:${port}`,
});

export default api;
