import { getUserById } from "../database/userQueries.js";

export const getUserData = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    const userData = await getUserById(userId);

    if (!userData) {
      res.status(404);
      throw new Error("User not found");
    }

    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateUserData = async (req, res) => {
  try {
  } catch (error) {}
};
