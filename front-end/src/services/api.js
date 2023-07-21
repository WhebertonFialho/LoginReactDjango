import axios from "axios";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = 'application/json';

const api = axios.create({
  baseURL : "http://localhost:8000",
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  
  config.headers.Authorization =  token ? `Bearer ${token}` : '';

  return config;
});

export { api };