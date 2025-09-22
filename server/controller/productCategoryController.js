import {
  createProductCategory,
  getProductCategories,
  getProductCategoriesCount,
  getProductCategoriesName,
  updateProductCategory,
} from "../database/queries/productCategoryQueries.js";

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

export const productCategoriesName = async (req, res) => {
  try {
    const categoriesName = await getProductCategoriesName();
    res.status(200).json({ categoriesName });
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
