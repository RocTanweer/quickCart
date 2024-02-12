import {
  getProductList,
  addProduct,
  getProductDetails,
  updateProductDetails,
  removeProductDetails,
} from "../controller/productController.js";
import {
  checkForAuthorizationToken,
  checkForAdminRole,
} from "../middleware/auth.js";

export default (router) => {
  router.get("/products", getProductList);
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
