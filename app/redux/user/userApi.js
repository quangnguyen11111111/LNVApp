import axios from "../../../axios";
// Api login with local
export const loginApi = (data) => axios.post("/api/login", data);
// Api register
export const registerApi = (data) => axios.post( "/api/createNewUser", data);
// Api refreshToken
export const refreshTokenApi = (token) =>
  axios.post("/api/refreshToken", { refreshToken: token });
// Api login with google
export const loginWithGoogleApi = (data)=>axios.post("/api/loginWithGoogle",data)