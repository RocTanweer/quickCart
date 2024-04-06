import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsAdmin,
  getProductsCount,
  getNewProducts,
  getRelatedProducts,
} from "../database/productQueries.js";

export const getProductList = async (req, res) => {
  try {
    const response = await getProducts(req.query);

    res.status(200).json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getNewProductList = async (req, res) => {
  try {
    const response = await getNewProducts();

    res.status(200).json({ newProducts: response });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getRelatedProductList = async (req, res) => {
  try {
    const response = await getRelatedProducts(req.params.productId);

    res.status(200).json({ relatedProducts: response });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getProductListAdmin = async (req, res) => {
  try {
    const products = await getProductsAdmin(req.query);

    res.status(200).json({ products });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const productsCount = async (req, res) => {
  try {
    const productsCount = await getProductsCount();
    res.status(200).json({ count: productsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    await createProduct(req.body);
    res.sendStatus(201);
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

    await updateProduct(productId, req.body);

    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const removeProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    await deleteProduct(productId);
    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message });
  }
};
