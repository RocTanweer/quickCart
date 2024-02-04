import bcrypt from "bcrypt";

import {
  isThereUser,
  createUser,
  getUserByEmail,
} from "../database/userQueries.js";

export const registration = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    // checking if the same user exist in the database
    if (await isThereUser(email)) {
      res.status(409);
      throw new Error(`User already exist with email ${email}`);
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const newUserInfo = {
      name,
      email,
      password: hashed_password,
      profileImage,
    };

    await createUser(newUserInfo);
    res.sendStatus(201);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking if user with that email exist
    const userFromDB = await getUserByEmail(email);
    if (!userFromDB) {
      res.status(404);
      throw new Error(`User not found with email ${email}`);
    }

    const passwordMatches = await bcrypt.compare(password, userFromDB.password);

    if (!passwordMatches) {
      res.status(401);
      throw new Error("Incorrect password");
    }

    res.status(200).json({
      userData: userFromDB,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
  } catch (error) {}
};
