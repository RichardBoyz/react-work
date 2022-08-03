import axios from "axios";

const backendURL = "https://nest-work.herokuapp.com";

const parseResponseData = (result) => {
  if (result.data) {
    return result.data;
  }
};

export const test = axios.create({
  baseURL: `${backendURL}/products`,
});

export const getTestData = () => test.get("/").then(parseResponseData);
