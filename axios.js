import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8083",
});
instance.interceptors.response.use((response) => {
  const { data } = response;
  console.log("HÚ");
  
  return response.data;
});

export default instance;
