import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const API_URL =
  publicRuntimeConfig.API_ENDPOINT || "http://localhost:8000/api/";

const signin = (authInfo) => {
  return axios.post(API_URL + "auth/signin", authInfo).then((response) => {
    if (response.data.token !== null) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  });
};
const signout = () => {
  localStorage.clear();
  return true;
};
const signup = (authInfo) => {
  return axios.post(API_URL + "auth/signup", authInfo).then((response) => {
    if (response.data.token !== null) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response.data;
  });
};

export default { signin, signout, signup };
