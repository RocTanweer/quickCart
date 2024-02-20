import express from "express";

import createAuthRoutes from "./authRoutes.js";
import createUserRoutes from "./userRoutes.js";
import createProductRoutes from "./productRoutes.js";
import createAdminRoutes from "./adminRoutes.js";

export const router = express.Router();

export default () => {
  createAuthRoutes(router);
  createUserRoutes(router);
  createProductRoutes(router);
  createAdminRoutes(router);
  return router;
};
