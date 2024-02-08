import axios from "axios";

const BASE_URL = "http://localhost:4000"; // later to be put in env file

export const axCli = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
