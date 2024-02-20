import {
  deleteUser,
  getUsers,
  getUsersCount,
  updateUserRole,
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

export const changeUserRole = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;

    await updateUserRole(userId, { role });

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
