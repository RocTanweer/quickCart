import {
  productCategoryList,
  addProductCategory,
  editProductCategory,
  productCategoriesCount,
  productCategoriesName,
} from "../controller/productCategoryController.js";

import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get("/productCategories", productCategoryList);
  router.get(
    "/productCategories/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    productCategoriesCount
  );
  router.get(
    "/productCategories/names",
    checkForAuthorizationToken,
    checkForAdminRole,
    productCategoriesName
  );
  router.post(
    "/productCategories",
    checkForAuthorizationToken,
    checkForAdminRole,
    addProductCategory
  );
  router.patch(
    "/productCategories/:productCategoryId",
    checkForAuthorizationToken,
    checkForAdminRole,
    editProductCategory
  );
};
