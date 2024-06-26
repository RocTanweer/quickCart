import { connection } from "../config/database.js";

export const getUsers = async (config) => {
  try {
    const { offset, rowsCount } = config;

    const sql = `SELECT user_id, name, email, profile_image, role FROM user LIMIT ?, ?`;
    const values = [offset, rowsCount];
    const [results] = await connection.execute(sql, values);

    return results;
  } catch (error) {
    throw error;
  }
};

export const getUsersCount = async () => {
  try {
    const sql = "SELECT COUNT(*) FROM user";
    const [result] = await connection.execute(sql);
    return result[0]["COUNT(*)"];
  } catch (error) {
    throw error;
  }
};

export const isThereUser = async (userEmail) => {
  try {
    const sql = `SELECT 1 FROM user WHERE email = ?`;
    const [result] = await connection.execute(sql, [userEmail]);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const sql = `SELECT * FROM user WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [userId]);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (userEmail) => {
  try {
    const sql = `SELECT * FROM user WHERE email = ?`;
    const [result] = await connection.execute(sql, [userEmail]);

    return result[0];
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ name, email, password, profileImage }) => {
  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      `INSERT INTO user (name, email, password, profile_image) VALUES (?, ?, ?, ?)`,
      [name, email, password, profileImage]
    );
    await connection.execute(`INSERT INTO shopping_cart (user_id) VALUES (?)`, [
      result.insertId,
    ]);
    await connection.commit();
  } catch (error) {
    connection.rollback();
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const sql = `DELETE FROM user WHERE user_id = ?`;
    const value = [userId];
    await connection.execute(sql, value);
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
    const sql = `UPDATE user
        SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        profile_image = COALESCE(?, profile_image),
        role = COALESCE(?, role)
      WHERE user_id = ?`;
    await connection.execute(sql, [
      name,
      email,
      password,
      profileImage,
      role,
      id,
    ]);
  } catch (error) {
    throw error;
  }
};
