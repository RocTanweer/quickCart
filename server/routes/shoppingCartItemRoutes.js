import {
  createShoppingCartItem,
  getCartItemsByCartId,
  removeShoppingCartItem,
} from "../controller/shoppingCartItemController.js";
import { checkForAuthorizationToken } from "../middleware/auth.js";

export default (router) => {
  router.get(
    "/shoppingCarts/:shoppingCartId/items",
    checkForAuthorizationToken,
    getCartItemsByCartId
  );
  router.post(
    "/shoppingCartItems",
    checkForAuthorizationToken,
    createShoppingCartItem
  );
  router.delete(
    "/shoppingCartItems/:shoppingCartItemId",
    checkForAuthorizationToken,
    removeShoppingCartItem
  );
};
