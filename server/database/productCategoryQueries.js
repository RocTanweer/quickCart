import { connection } from "../config/database.js";

export const createProductCategory = async (data) => {
  try {
    const sql = `INSERT INTO product_category
            (name, thumbnail) VALUES (?, ?)
        `;
    const values = [data.name, data.thumbnail];
    await connection.execute(sql, values);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductCategories = async (config) => {
  try {
    const { offset, rowsCount } = config;
    const sql = `SELECT * FROM product_category LIMIT ?, ?`;
    const values = [offset, rowsCount];
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductCategoriesCount = async () => {
  try {
    const sql = "SELECT COUNT(*) FROM product_category";
    const [result] = await connection.execute(sql);
    return result[0]["COUNT(*)"];
  } catch (error) {
    throw error;
  }
};

export const updateProductCategory = async (
  productCategoryId,
  productCategoryUpdates
) => {
  try {
    const { name = null, thumbnail = null } = productCategoryUpdates;

    const sql = `UPDATE product_category
            SET
            name = COALESCE(?, name),
            thumbnail = COALESCE(?, thumbnail)
            WHERE id = ?
        `;
    const values = [name, thumbnail, productCategoryId];

    await connection.execute(sql, values);
  } catch (error) {
    throw error;
  }
};
