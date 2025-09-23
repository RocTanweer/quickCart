import express from "express";

import createAuthRoutes from "./authRoutes.js";
import createUserRoutes from "./userRoutes.js";
import createProductRoutes from "./productRoutes.js";
import createProductCategoryRoutes from "./productCategoryRoutes.js";
import createProductBrandRoutes from "./productBrandRoutes.js";
import createShoppingCartItemsRoutes from "./shoppingCartItemRoutes.js";
import createAddressRoutes from "./addressRoutes.js";

export const router = express.Router();

export default () => {
  createAuthRoutes(router);
  createUserRoutes(router);
  createProductRoutes(router);
  createProductCategoryRoutes(router);
  createProductBrandRoutes(router);
  createShoppingCartItemsRoutes(router);
  createAddressRoutes(router);
  return router;
};
