import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const axCli = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
