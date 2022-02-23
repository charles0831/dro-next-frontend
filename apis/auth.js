import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const API_URL =
  publicRuntimeConfig.API_ENDPOINT || "http://localhost:8000/api/";

class Auth {
  signin = (authInfo) => {
    return axios.post(API_URL + "auth/login", authInfo).then((response) => {
      if (response.data.token !== null) {
        console.log("@@@@@@@@@@@@@@@@@", response.data.data);
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
      }
      return response.data;
    });
  };
  signout = () => {
    localStorage.clear();
    return true;
  };
  signup = (authInfo) => {
    return axios.post(API_URL + "auth/register", authInfo).then((response) => {
      if (response.data.token !== null) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
  };
}

export default new Auth();