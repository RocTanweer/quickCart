import { connection } from "../config/database.js";

export const getUsers = async () => {
  try {
    const sql = `SELECT * FROM user`;
    const [results] = await connection.execute(sql);

    return results;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const sql = `SELECT * FROM user WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [userId]);

    return result;
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
    const [result] = await connection.execute(sql, [userId]);

    return result;
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
