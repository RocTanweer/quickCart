import { db } from "../db.js"; // knex instance

export const getShoppingCartItems = async (shoppingCartId) => {
  try {
    const results = await db("shopping_cart_item as sci")
      .select(
        "sci.id as cart_item_id",
        "p.id as product_id",
        "p.name as product_name",
        "p.image as product_image",
        "p.unit_price as product_price",
        "p.stock_quantity as product_stock_quantity",
        db.raw("1 as product_quantity")
      )
      .join("product as p", "p.id", "sci.product_id")
      .where("sci.shopping_cart_id", shoppingCartId)
      .orderBy("sci.id");

    return results;
  } catch (error) {
    throw error;
  }
};

const getShoppingCartItem = async (id, trx) => {
  try {
    const row = await trx("shopping_cart_item as sci")
      .select(
        "sci.id as cart_item_id",
        "p.id as product_id",
        "p.name as product_name",
        "p.image as product_image",
        "p.unit_price as product_price",
        "p.stock_quantity as product_stock_quantity",
        db.raw("1 as product_quantity")
      )
      .join("product as p", "p.id", "sci.product_id")
      .where("sci.id", id)
      .first();

    return row;
  } catch (error) {
    throw error;
  }
};

export const addShoppingCartItem = async ({ shoppingCartId, productId }) => {
  const trx = await db.transaction(); // start transaction
  try {
    const [insertId] = await trx("shopping_cart_item").insert({
      shopping_cart_id: shoppingCartId,
      product_id: productId,
    });

    // For MySQL, insert returns an object with insertId
    const id = insertId.insertId || insertId;

    const cartItem = await getShoppingCartItem(id, trx);

    await trx.commit();
    return cartItem;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

export const deleteShoppingCartItem = async (shoppingCartItemId) => {
  try {
    await db("shopping_cart_item").where({ id: shoppingCartItemId }).del();
  } catch (error) {
    throw error;
  }
};

export const getShoppingCartId = async (userId) => {
  try {
    const row = await db("shopping_cart")
      .select("id")
      .where({ user_id: userId })
      .first();
    return row?.id;
  } catch (error) {
    throw error;
  }
};
