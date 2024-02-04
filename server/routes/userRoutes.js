import { getUserData } from "../controller/userController.js";

export default (router) => {
  router.get("/users/:userId", getUserData);
};
