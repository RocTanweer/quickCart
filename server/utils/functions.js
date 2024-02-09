import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/envVar.js";
import { AT_EXPIRY_TIME } from "../config/constants.js";

export const generateAccessToken = (userLoginInfo) => {
  return jsonwebtoken.sign(userLoginInfo, ACCESS_TOKEN_SECRET, {
    expiresIn: AT_EXPIRY_TIME,
  });
};
