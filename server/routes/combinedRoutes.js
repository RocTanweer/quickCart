import express from "express";

import createAuthRoutes from "./authRoutes.js";

export const router = express.Router();

export default () => {
  createAuthRoutes(router);
  return router;
};
