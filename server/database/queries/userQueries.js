import { db } from "../db.js"; // knex instance

export const getUsers = async (config) => {
  try {
    const { offset, rowsCount } = config;
    const results = await db("user")
      .select("user_id", "name", "email", "profile_image", "role")
      .limit(rowsCount)
      .offset(offset);

    return results;
  } catch (error) {
    throw error;
  }
};

export const getUsersCount = async () => {
  try {
    const [{ count }] = await db("user").count("* as count");
    return count;
  } catch (error) {
    throw error;
  }
};

export const isThereUser = async (userEmail) => {
  try {
    const row = await db("user")
      .select(db.raw("1"))
      .where("email", userEmail)
      .first();
    return row;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const row = await db("user").where("user_id", userId).first();
    return row;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (userEmail) => {
  try {
    const row = await db("user").where("email", userEmail).first();
    return row;
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ name, email, password, profileImage }) => {
  const trx = await db.transaction();
  try {
    const [result] = await trx("user").insert({
      name,
      email,
      password,
      profile_image: profileImage,
    });

    const userId = result.insertId || result; // MySQL insertId
    await trx("shopping_cart").insert({ user_id: userId });

    await trx.commit();
  } catch (error) {
    await trx.rollback();
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await db("user").where("user_id", userId).del();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, updateDetails) => {
  try {
    const {
      name = null,
      email = null,
      password = null,
      profileImage = null,
      role = null,
    } = updateDetails;

    await db("user")
      .where({ user_id: id })
      .update({
        name: db.raw("COALESCE(?, name)", [name]),
        email: db.raw("COALESCE(?, email)", [email]),
        password: db.raw("COALESCE(?, password)", [password]),
        profile_image: db.raw("COALESCE(?, profile_image)", [profileImage]),
        role: db.raw("COALESCE(?, role)", [role]),
      });
  } catch (error) {
    throw error;
  }
};
