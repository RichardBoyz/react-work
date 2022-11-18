import axios from "axios";

// const backendURL = "https://nest-work.herokuapp.com";
const backendURL = "http://127.0.0.1:3000/";

const parseResponseData = (result) => {
  if (result.data) {
    return result.data;
  }
};

const userApi = axios.create({
  baseURL: `${backendURL}/users`,
});

export const createUse = (data) =>
  userApi.post("/", data).then(parseResponseData);

export const getUsers = (signal) =>
  userApi.get("/list", { signal }).then(parseResponseData);
