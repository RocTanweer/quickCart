import {
  createProductCategory,
  deleteProductCategory,
  getProductCategories,
  getProductCategoriesCount,
  updateProductCategory,
} from "../database/productCategoryQueries.js";
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

export const addProductCategory = async (req, res) => {
  try {
    const data = req.body;
    await createProductCategory(data);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productCategoryList = async (req, res) => {
  try {
    const config = req.query;
    const productCategoriesList = await getProductCategories(config);
    res.status(200).json({ productCategoriesList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productCategoriesCount = async (req, res) => {
  try {
    const productCategoriesCount = await getProductCategoriesCount();
    res.status(200).json({ count: productCategoriesCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    const updateDetails = req.body;
    await updateProductCategory(productCategoryId, updateDetails);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProductCategory = async (req, res) => {
  try {
    const productCategoryId = req.params.productCategoryId;
    await deleteProductCategory(productCategoryId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
