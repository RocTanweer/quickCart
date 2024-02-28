import {
  getUserById,
  getUsers,
  getUsersCount,
  updateUser,
  deleteUser,
} from "../database/userQueries.js";

export const userList = async (req, res) => {
  try {
    const config = req.query;

    const users = await getUsers(config);
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const usersCount = async (req, res) => {
  try {
    const usersCount = await getUsersCount();
    res.status(200).json({ count: usersCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
    const userId = req.params.userId;
    const updateDetails = req.body;

    await updateUser(userId, updateDetails);

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    await deleteUser(userId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
