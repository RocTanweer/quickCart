import { connection } from "../config/database.js";

export const createProductBrand = async (data) => {
  try {
    const sql = `INSERT INTO product_brand
              (name) VALUES (?)
          `;
    const value = [data.name];
    await connection.execute(sql, value);
  } catch (error) {
    throw error;
  }
};

export const getProductBrands = async (config) => {
  try {
    const { offset, rowsCount } = config;
    const sql = `SELECT * FROM product_brand LIMIT ?, ?`;
    const values = [offset, rowsCount];
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductBrandsCount = async () => {
  try {
    const sql = "SELECT COUNT(*) FROM product_brand";
    const [result] = await connection.execute(sql);
    return result[0]["COUNT(*)"];
  } catch (error) {
    throw error;
  }
};

export const updateProductBrand = async (
  productBrandId,
  productBrandUpdates
) => {
  try {
    const { name = null } = productBrandUpdates;

    const sql = `UPDATE product_brand
              SET
              name = COALESCE(?, name)
              WHERE id = ?
          `;
    const values = [name, productBrandId];

    await connection.execute(sql, values);
  } catch (error) {
    throw error;
  }
};
