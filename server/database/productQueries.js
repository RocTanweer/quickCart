import { connection } from "../config/database.js";

export const getProducts = async (conditions) => {
  const { page, pageSize, category, brand, minPrice, maxPrice, availability } =
    conditions;

  let sql = "SELECT * FROM product WHERE 1=1";
  const values = [];

  if (category) {
    sql += " AND category = ?";
    values.push(category);
  }
  if (brand) {
    sql += " AND brand = ?";
    values.push(brand);
  }
  if (availability) sql += ` AND stock_quantity > 0`;

  if (minPrice && maxPrice) {
    (sql += " AND price >= ? AND price <= ?"),
      values.push(parseFloat(minPrice), parseFloat(maxPrice));
  }

  const offset = (parseInt(page) - 1) * parseInt(pageSize);

  sql += ` LIMIT ?, ?`;
  values.push(offset, parseInt(pageSize));

  try {
    const results = await connection.execute(sql, values);
    console.log(results);
  } catch (error) {
    throw error;
  }
};
