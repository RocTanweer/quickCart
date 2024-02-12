import { connection } from "../config/database.js";

export const createProduct = async (productDetails) => {
  try {
    const {
      productCategoryId,
      productBrandId,
      unitPrice,
      stockQuantity,
      name,
      description,
      image,
    } = productDetails;

    const sql = `INSERT INTO product
       (product_category_id, product_brand_id, unit_price, stock_quantity, name, description, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       `;
    const values = [
      productCategoryId,
      productBrandId,
      unitPrice,
      stockQuantity,
      name,
      description,
      image,
    ];

    const [result] = await connection.execute(sql, values);
    return result[0];
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (conditions) => {
  try {
    const {
      page,
      pageSize,
      productCategoryId,
      productBrandId,
      minPrice,
      maxPrice,
      availability,
    } = conditions;

    // later fetch only columns that is required in product list
    let sql = "SELECT id, unit_price, name, image FROM product WHERE 1 = 1";
    const values = [];

    if (productCategoryId) {
      sql += " AND product_category_id = ?";
      values.push(productCategoryId);
    }
    if (productBrandId) {
      sql += " AND product_brand_id = ?";
      values.push(productBrandId);
    }
    if (availability) sql += " AND stock_quantity > 0";

    if (minPrice && maxPrice) {
      sql += " AND unit_price >= ? AND unit_price <= ?";
      values.push(minPrice, maxPrice);
    }

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    sql += " LIMIT ?, ?";
    values.push(`${offset}`, pageSize);
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const sql = "SELECT * FROM product WHERE id = ?";
    const value = [productId];

    const [result] = await connection.execute(sql, value);
    return result[0];
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, productUpdates) => {
  try {
    const {
      unitPrice = null,
      stockQuantity = null,
      name = null,
      description = null,
      image = null,
    } = productUpdates;

    const sql = `UPDATE product
    SET
    unit_price = COALESCE(?, unit_price),
    stock_quantity = COALESCE(?, stock_quantity),
    name = COALESCE(?, name),
    description = COALESCE(?, description),
    image = COALESCE(?, image)
    WHERE id = ?
    `;
    const values = [
      unitPrice,
      stockQuantity,
      name,
      description,
      image,
      productId,
    ];

    const [result] = await connection.execute(sql, values);
    return result[0];
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const sql = "DELETE FROM product WHERE id = ?";
    const value = [productId];

    const [result] = await connection.execute(sql, value);
    return result[0];
  } catch (error) {
    throw error;
  }
};
