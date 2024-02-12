import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../database/productQueries.js";

export const getProductList = async (req, res) => {
  try {
    const products = await getProducts(req.query);

    res.status(200).json({ products });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const response = await createProduct(req.body);
    res.status(201).json({ response });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productDetails = await getProductById(productId);

    res.status(200).json({ productDetails });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;

    const response = await updateProduct(productId, req.body);

    res.status(200).json({ response });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const removeProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await deleteProduct(productId);
    res.status(204).json({ response });
  } catch (error) {
    res.json({ message: error.message });
  }
};
