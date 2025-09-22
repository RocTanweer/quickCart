import { db } from "../db.js";

export const createProduct = async (productDetails) => {
  try {
    const {
      category_id,
      brand_id,
      unit_price,
      stock_quantity,
      name,
      description,
      image,
    } = productDetails;

    await db("product").insert({
      product_category_id: category_id,
      product_brand_id: brand_id,
      unit_price,
      stock_quantity,
      name,
      description,
      image,
    });
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (conditions) => {
  try {
    const {
      offset,
      rowsCount,
      productCategories,
      productBrands,
      minPrice,
      maxPrice,
      availability,
    } = conditions;

    const baseQuery = db("product").select("id", "unit_price", "name", "image");
    const countQuery = db("product").count("* as count");

    if (productCategories) {
      if (Array.isArray(productCategories)) {
        baseQuery.whereIn("product_category_id", productCategories);
        countQuery.whereIn("product_category_id", productCategories);
      } else {
        baseQuery.where("product_category_id", productCategories);
        countQuery.where("product_category_id", productCategories);
      }
    }

    if (productBrands) {
      if (Array.isArray(productBrands)) {
        baseQuery.whereIn("product_brand_id", productBrands);
        countQuery.whereIn("product_brand_id", productBrands);
      } else {
        baseQuery.where("product_brand_id", productBrands);
        countQuery.where("product_brand_id", productBrands);
      }
    }

    if (availability === "available") {
      baseQuery.where("stock_quantity", ">", 0);
      countQuery.where("stock_quantity", ">", 0);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      baseQuery.whereBetween("unit_price", [minPrice, maxPrice]);
      countQuery.whereBetween("unit_price", [minPrice, maxPrice]);
    }

    const [{ count }] = await countQuery;
    const products = await baseQuery.offset(offset).limit(rowsCount);

    return { products, count };
  } catch (error) {
    throw error;
  }
};

export const getNewProducts = async () => {
  try {
    const results = await db("product")
      .select("id", "name", "description", "image")
      .orderBy("id", "desc")
      .limit(5);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getRelatedProducts = async (productId) => {
  try {
    const { product_category_id } = await db("product")
      .select("product_category_id")
      .where("id", productId)
      .first();

    if (!product_category_id) return [];

    const results = await db("product")
      .select("id", "unit_price", "name", "image")
      .whereNot("id", productId)
      .andWhere("product_category_id", product_category_id)
      .limit(5);

    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductsAdmin = async (config) => {
  try {
    const { offset, rowsCount } = config;

    const results = await db("product as p")
      .select(
        "p.id",
        "p.image",
        "p.name",
        "p.description",
        "p.unit_price",
        "p.stock_quantity",
        "pc.name as category_name",
        "pc.id as category_id",
        "pb.name as brand_name",
        "pb.id as brand_id"
      )
      .join("product_category as pc", "p.product_category_id", "pc.id")
      .join("product_brand as pb", "p.product_brand_id", "pb.id")
      .orderBy("p.id")
      .offset(offset)
      .limit(rowsCount);

    return results;
  } catch (error) {
    throw error;
  }
};

export const getProductsCount = async () => {
  try {
    const [{ count }] = await db("product").count("* as count");
    return count;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const result = await db("product as p")
      .select(
        "p.id",
        "p.image",
        "p.name",
        "p.description",
        "p.unit_price",
        "p.stock_quantity",
        "pc.name as category_name",
        "pb.name as brand_name"
      )
      .join("product_category as pc", "p.product_category_id", "pc.id")
      .join("product_brand as pb", "p.product_brand_id", "pb.id")
      .where("p.id", productId)
      .first();

    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, productUpdates) => {
  try {
    const {
      unit_price = null,
      stock_quantity = null,
      name = null,
      description = null,
      image = null,
      brand_id = null,
      category_id = null,
    } = productUpdates;

    await db("product")
      .where({ id: productId })
      .update({
        unit_price: db.raw("COALESCE(?, unit_price)", [unit_price]),
        stock_quantity: db.raw("COALESCE(?, stock_quantity)", [stock_quantity]),
        name: db.raw("COALESCE(?, name)", [name]),
        description: db.raw("COALESCE(?, description)", [description]),
        image: db.raw("COALESCE(?, image)", [image]),
        product_category_id: db.raw("COALESCE(?, product_category_id)", [
          category_id,
        ]),
        product_brand_id: db.raw("COALESCE(?, product_brand_id)", [brand_id]),
      });
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await db("product").where({ id: productId }).del();
  } catch (error) {
    throw error;
  }
};
