import { db } from "../db.js";

export const selectAddress = async (userId) => {
  try {
    const result = await db("address").where({ user_id: userId }).first();
    return result;
  } catch (error) {
    throw error;
  }
};

export const insertAddress = async (details) => {
  try {
    const {
      userId,
      name,
      mobile,
      pinCode,
      city,
      state,
      addressLine1,
      addressLine2,
      landmark,
    } = details;

    const [newAddressId] = await db("address").insert({
      user_id: userId,
      name,
      mobile,
      pin_code: pinCode,
      city,
      state,
      address_line_1: addressLine1,
      address_line_2: addressLine2,
      landmark,
    });

    return newAddressId;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (addressId, updates) => {
  try {
    const {
      name = null,
      mobile = null,
      pinCode = null,
      city = null,
      state = null,
      addressLine1 = null,
      addressLine2 = null,
      landmark = null,
    } = updates;

    const updated = await db("address")
      .where({ id: addressId })
      .update({
        name: db.raw("COALESCE(?, name)", [name]),
        mobile: db.raw("COALESCE(?, mobile)", [mobile]),
        pin_code: db.raw("COALESCE(?, pin_code)", [pinCode]),
        city: db.raw("COALESCE(?, city)", [city]),
        state: db.raw("COALESCE(?, state)", [state]),
        address_line_1: db.raw("COALESCE(?, address_line_1)", [addressLine1]),
        address_line_2: db.raw("COALESCE(?, address_line_2)", [addressLine2]),
        landmark: db.raw("COALESCE(?, landmark)", [landmark]),
      });

    return updated;
  } catch (error) {
    throw error;
  }
};
