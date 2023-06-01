import { message } from "antd";
import axios from "axios";
import { parseCookies } from "nookies";

const { sgcc: token } = parseCookies();

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
});

if (token) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    message.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export default api;
