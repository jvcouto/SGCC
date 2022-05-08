import axios from "axios";
import { parseCookies } from "nookies";

const { "PCA-Token": token } = parseCookies();

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
});

if (token) {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  api.defaults.headers["Authorization"] = `Baerer ${token}`;
}

export default api;
