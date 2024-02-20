import { connection } from "../config/database.js";

export const getUsers = async (config) => {
  try {
    const { page, pageSize } = config;

    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const sql = `SELECT user_id, name, email, profile_image, role FROM user LIMIT ?, ?`;
    const values = [`${offset}`, pageSize];
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

export const updateUserRole = async (userId, { role }) => {
  try {
    const sql = `UPDATE user SET role = ? WHERE user_id = ?`;
    const values = [role, userId];

    await connection.execute(sql, values);
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

export const createUser = async (userData) => {
  try {
    // createdAt, updatedAt, and roles
    const { name, email, password, profileImage } = userData;
    const sql = `INSERT INTO user (name, email, password, profile_image) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(sql, [
      name,
      email,
      password,
      profileImage,
    ]);

    return result;
  } catch (error) {
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

export const updateUser = async (userUpdates) => {
  try {
    // Expecting userUpdates to handle null cases
    const { userId, name, email, password, profileImage } = userUpdates;
    const sql = `UPDATE user
        SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        password = COALESCE(?, password),
        profile_image = COALESCE(?, profile_image)
      WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [
      name,
      email,
      password,
      profileImage,
      userId,
    ]);

    return result;
  } catch (error) {
    throw error;
  }
};
