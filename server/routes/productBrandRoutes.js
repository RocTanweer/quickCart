import {
  addProductBrand,
  productBrandList,
  productBrandsCount,
  editProductBrand,
  productBrandsName,
} from "../controller/productBrandController.js";

import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get("/productBrands", productBrandList);
  router.get(
    "/productBrands/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    productBrandsCount
  );
  router.get(
    "/productBrands/names",
    checkForAuthorizationToken,
    checkForAdminRole,
    productBrandsName
  );
  router.post(
    "/productBrands",
    checkForAuthorizationToken,
    checkForAdminRole,
    addProductBrand
  );
  router.patch(
    "/productBrands/:productBrandId",
    checkForAuthorizationToken,
    checkForAdminRole,
    editProductBrand
  );
};
