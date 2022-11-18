import axios from "axios";
import Cookies from "universal-cookie";
import useAxiosProvide from "../hooks/userAxiosPrivate";

const cookies = new Cookies();

// const backendURL = "https://nest-work.herokuapp.com";
const backendURL = "http://127.0.0.1:3000/";

const parseResponseData = (result) => {
  if (result.data) {
    return result.data;
  }
};

// export const test = axios.create({
//   baseURL: `${backendURL}/products`,
// });

export const getTestData = () => test.get("/").then(parseResponseData);

const backendApi = axios.create({
  baseURL: `${backendURL}`,
  withCredentials: true,
});

export const axioPrivate = axios.create({
  baseURL: `${backendURL}`,
  withCredentials: true,
  // headers: { Authorization: `Bearer ${cookies.get("jwt-access")}` },
});

export const test = () => axioPrivate.get("/test").then(parseResponseData);

export const refreshToken = (refreshToken) =>
  axioPrivate
    .get("/refresh", { headers: { Authorization: `Bearer ${refreshToken}` } })
    .then(parseResponseData);

export const login = (data) => axioPrivate.post("/login", data);

export const signup = (data) => axioPrivate.post("/signup", data);

export const logout = (data) => axioPrivate.post("/logout");
