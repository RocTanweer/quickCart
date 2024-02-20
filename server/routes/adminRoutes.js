import {
  userList,
  changeUserRole,
  removeUser,
  usersCount,
} from "../controller/adminController.js";

import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get(
    "/admin/users",
    checkForAuthorizationToken,
    checkForAdminRole,
    userList
  );

  router.get(
    "/admin/users/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    usersCount
  );

  router.patch(
    "/admin/users/:userId",
    checkForAuthorizationToken,
    checkForAdminRole,
    changeUserRole
  );

  router.delete(
    "/admin/users/:userId",
    checkForAuthorizationToken,
    checkForAdminRole,
    removeUser
  );
};
