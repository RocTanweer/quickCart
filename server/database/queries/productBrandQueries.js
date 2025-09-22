import { db } from "../db.js";

export const createProductBrand = async (data) => {
  try {
    await db("product_brand").insert({ name: data.name });
  } catch (error) {
    throw error;
  }
};

export const getProductBrands = async (config) => {
  try {
    const { offset, rowsCount } = config;
    let query = db("product_brand").select("*").orderBy("id");

    if (offset !== undefined && rowsCount !== undefined) {
      query = query.offset(offset).limit(rowsCount);
    }

    const results = await query;
    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductBrandsCount = async () => {
  try {
    const [result] = await db("product_brand").count("* as count");
    return result.count;
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

    await db("product_brand")
      .where({ id: productBrandId })
      .update({
        name: db.raw("COALESCE(?, name)", [name]),
      });
  } catch (error) {
    throw error;
  }
};

export const getProductBrandsName = async () => {
  try {
    const results = await db("product_brand").select("id", "name");
    return results;
  } catch (error) {
    throw error;
  }
};
