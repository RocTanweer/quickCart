import {
  createAddress,
  editAddress,
  getAddress,
} from "../controller/addressController.js";
import { checkForAuthorizationToken } from "../middleware/auth.js";

export default (router) => {
  router.get("/address/:userId", checkForAuthorizationToken, getAddress);
  router.post("/address", checkForAuthorizationToken, createAddress);
  router.patch("/address/:addressId", checkForAuthorizationToken, editAddress);
};
