import {
  getUserData,
  removeUser,
  updateUserData,
  userList,
  usersCount,
} from "../controller/userController.js";
import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get("/users", checkForAuthorizationToken, checkForAdminRole, userList);
  router.get(
    "/users/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    usersCount
  );
  router.get("/users/:userId", checkForAuthorizationToken, getUserData);
  router.patch("/users/:userId", checkForAuthorizationToken, updateUserData);
  router.delete(
    "/users/:userId",
    checkForAuthorizationToken,
    checkForAdminRole,
    removeUser
  );
};
