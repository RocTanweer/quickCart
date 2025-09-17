import {
  getShoppingCartItems,
  addShoppingCartItem,
  deleteShoppingCartItem,
} from "../database/shoppingCartItemQueries.js";

export const getCartItemsByCartId = async (req, res) => {
  try {
    const shoppingCartId = req.params.shoppingCartId;

    const shoppingCartItems = await getShoppingCartItems(shoppingCartId);

    res.status(200).json({ shoppingCartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createShoppingCartItem = async (req, res) => {
  try {
    const { shoppingCartId, productId } = req.body;
    const cartItem = await addShoppingCartItem({ shoppingCartId, productId });
    res.status(201).json({ cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeShoppingCartItem = async (req, res) => {
  try {
    const shoppingCartItemId = req.params.shoppingCartItemId;

    await deleteShoppingCartItem(shoppingCartItemId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
