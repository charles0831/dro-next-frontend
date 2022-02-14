import axios from "axios";
const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_ENDPOINT || "http://localhost:8000/api/auth/";

class Api {
  auth = () => {
    return axios
      .get(API_URL, { headers: {} })
      .then((response) => response.data);
  };
}

export default new Api();
