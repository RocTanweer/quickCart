import { login, registration } from "../controller/authController.js";

export default (router) => {
  router.post("/register", registration);
  router.post("/login", login);
};
