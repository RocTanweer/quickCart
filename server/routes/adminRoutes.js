import {
  userList,
  changeUserRole,
  removeUser,
  usersCount,
  productCategoryList,
  addProductCategory,
  editProductCategory,
  removeProductCategory,
  productCategoriesCount,
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

  router.get(
    "/admin/productCategories",
    checkForAuthorizationToken,
    checkForAdminRole,
    productCategoryList
  );
  router.get(
    "/admin/productCategories/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    productCategoriesCount
  );

  router.post(
    "/admin/productCategories",
    checkForAuthorizationToken,
    checkForAdminRole,
    addProductCategory
  );

  router.patch(
    "/admin/productCategories/:productCategoryId",
    checkForAuthorizationToken,
    checkForAdminRole,
    editProductCategory
  );

  router.delete(
    "/admin/productCategories/:productCategoryId",
    checkForAuthorizationToken,
    checkForAdminRole,
    removeProductCategory
  );
};
