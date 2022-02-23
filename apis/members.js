import axios from "axios";
import authHeader from "./auth-header";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const API_URL =
  publicRuntimeConfig.API_ENDPOINT || "http://localhost:8000/api/";

class Members {
  getMemberList = (data) => {
    return axios.get(API_URL + "members", {
      params: data,
      headers: authHeader(),
    });
  };
}

export default new Members();
