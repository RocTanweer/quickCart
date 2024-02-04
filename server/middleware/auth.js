import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/envVar.js";

export const checkForAuthorizationToken = (req, res, next) => {
  try {
    const cookie = req.cookies["qcticket"];

    if (!cookie || !cookie.token) {
      res.status(401);
      throw new Error("Unauthorized - Either cookie or jwt token missing");
    }

    jsonwebtoken.verify(
      cookie.token,
      ACCESS_TOKEN_SECRET,
      (err, tokenPayload) => {
        if (err) {
          res.status(401);
          throw new Error("Unauthorized - Token expired");
        } else if (tokenPayload.userId !== parseInt(req.params.userId)) {
          res.status(403);
          throw new Error("Forbidden - Token does not belong to this user");
        } else {
          next();
        }
      }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};
