import {
  getProductList,
  getProductListAdmin,
  addProduct,
  getProductDetails,
  updateProductDetails,
  removeProductDetails,
  productsCount,
} from "../controller/productController.js";
import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get("/products", getProductList);
  router.get(
    "/products/admin",
    checkForAuthorizationToken,
    checkForAdminRole,
    getProductListAdmin
  );
  router.get(
    "/products/count",
    checkForAuthorizationToken,
    checkForAdminRole,
    productsCount
  );
  router.post(
    "/products",
    checkForAuthorizationToken,
    checkForAdminRole,
    addProduct
  );
  router.get("/products/:productId", getProductDetails);
  router.patch(
    "/products/:productId",
    checkForAuthorizationToken,
    checkForAdminRole,
    updateProductDetails
  );
  router.delete(
    "/products/:productId",
    checkForAuthorizationToken,
    checkForAdminRole,
    removeProductDetails
  );
};
