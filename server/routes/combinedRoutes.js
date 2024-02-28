import express from "express";

import createAuthRoutes from "./authRoutes.js";
import createUserRoutes from "./userRoutes.js";
import createProductRoutes from "./productRoutes.js";
import createProductCategoryRoutes from "./productCategoryRoutes.js";

export const router = express.Router();

export default () => {
  createAuthRoutes(router);
  createUserRoutes(router);
  createProductRoutes(router);
  createProductCategoryRoutes(router);
  return router;
};
