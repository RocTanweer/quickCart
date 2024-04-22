import { connection } from "../config/database.js";

export const getShoppingCartItems = async (shoppingCartId) => {
  try {
    const sql = `SELECT p.name AS product_name, p.image AS product_image, p.unit_price AS product_price, sci.quantity AS product_quantity
        FROM shopping_cart_item sci
        JOIN product p ON p.id = sci.product_id
        WHERE sci.shopping_cart_id = ?
        ORDER BY sci.id
        `;
    const [results] = await connection.execute(sql, [shoppingCartId]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const addShoppingCartItem = async ({ shoppingCartId, productId }) => {
  try {
    console.log(shoppingCartId, productId);
    const sql = `INSERT INTO shopping_cart_item (shopping_cart_id, product_id) VALUES (?, ?)`;
    await connection.execute(sql, [shoppingCartId, productId]);
  } catch (error) {
    throw error;
  }
};

export const deleteShoppingCartItem = async (shoppingCartItemId) => {
  try {
    const sql = `DELETE FROM shopping_cart_item WHERE id = ?`;
    await connection.execute(sql, [shoppingCartItemId]);
  } catch (error) {
    throw error;
  }
};

export const getShoppingCartId = async (userId) => {
  try {
    const sql = `SELECT id from shopping_cart WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [userId]);
    return result[0].id;
  } catch (error) {
    throw error;
  }
};
