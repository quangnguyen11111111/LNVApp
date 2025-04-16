import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8083",
  baseURL: "http://192.168.1.12:8083",//mạng lan ở nhà
});
instance.interceptors.response.use((response) => {
  const { data } = response;
  
  return response.data;
});

export default instance;
