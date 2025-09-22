import { db } from "../db.js"; // assuming db is your knex instance

export const createProductCategory = async (data) => {
  try {
    await db("product_category").insert({
      name: data.name,
      thumbnail: data.thumbnail,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductCategories = async (config) => {
  try {
    const { offset, rowsCount } = config;
    let query = db("product_category").select("*");

    if (offset !== undefined && rowsCount !== undefined) {
      query = query.offset(offset).limit(rowsCount);
    }

    const results = await query;
    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductCategoriesCount = async () => {
  try {
    const [result] = await db("product_category").count("* as count");
    return result.count;
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

    await db("product_category")
      .where({ id: productCategoryId })
      .update({
        name: db.raw("COALESCE(?, name)", [name]),
        thumbnail: db.raw("COALESCE(?, thumbnail)", [thumbnail]),
      });
  } catch (error) {
    throw error;
  }
};

export const getProductCategoriesName = async () => {
  try {
    const results = await db("product_category").select("id", "name");
    return results;
  } catch (error) {
    throw error;
  }
};
