import axios from "axios";
import authHeader from "./auth-header";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const API_URL =
  publicRuntimeConfig.API_ENDPOINT || "http://localhost:8000/api/";

const getUsers = () => {
  return axios.get(API_URL + "users", {
    params: {},
    headers: authHeader(),
  });
};

export default { getUsers };
