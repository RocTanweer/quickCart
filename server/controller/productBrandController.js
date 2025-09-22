import {
  createProductBrand,
  getProductBrands,
  getProductBrandsCount,
  getProductBrandsName,
  updateProductBrand,
} from "../database/queries/productBrandQueries.js";

export const addProductBrand = async (req, res) => {
  try {
    const data = req.body;
    await createProductBrand(data);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productBrandList = async (req, res) => {
  try {
    const config = req.query;
    const brandList = await getProductBrands(config);
    res.status(200).json({ brandList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productBrandsCount = async (req, res) => {
  try {
    const brandsCount = await getProductBrandsCount();
    res.status(200).json({ count: brandsCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const productBrandsName = async (req, res) => {
  try {
    const brandsName = await getProductBrandsName();
    res.status(200).json({ brandsName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editProductBrand = async (req, res) => {
  try {
    const productBrandId = req.params.productBrandId;
    const updateDetails = req.body;
    await updateProductBrand(productBrandId, updateDetails);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
