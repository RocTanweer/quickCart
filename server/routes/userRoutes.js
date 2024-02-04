import { getUserData } from "../controller/userController.js";
import { checkForAuthorizationToken } from "../middleware/index.js";

export default (router) => {
  router.get("/users/:userId", checkForAuthorizationToken, getUserData);
};
