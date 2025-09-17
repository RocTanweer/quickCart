import { connection } from "../config/database.js";

export const getShoppingCartItems = async (shoppingCartId) => {
  try {
    const sql = `SELECT sci.id AS cart_item_id, p.id AS product_id, p.name AS product_name, p.image AS product_image, p.unit_price AS product_price, p.stock_quantity AS product_stock_quantity, 1 AS product_quantity
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

const getShoppingCartItem = async (id) => {
  try {
    const sql = `SELECT sci.id AS cart_item_id, p.id AS product_id, p.name AS product_name, p.image AS product_image, p.unit_price AS product_price, p.stock_quantity AS product_stock_quantity, 1 AS product_quantity
        FROM shopping_cart_item sci
        JOIN product p ON p.id = sci.product_id
        WHERE sci.id = ?
        `;
    const [rows] = await connection.execute(sql, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

export const addShoppingCartItem = async ({ shoppingCartId, productId }) => {
  try {
    await connection.beginTransaction(); // start transaction

    const sql = `INSERT INTO shopping_cart_item (shopping_cart_id, product_id) VALUES (?, ?)`;

    const [insertResult] = await connection.execute(sql, [
      shoppingCartId,
      productId,
    ]);
    const insertId = insertResult.insertId;

    const cartItem = await getShoppingCartItem(insertId);

    await connection.commit();

    return cartItem;
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

export const deleteShoppingCartItem = async (id) => {
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
