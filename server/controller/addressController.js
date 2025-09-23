import {
  insertAddress,
  selectAddress,
  updateAddress,
} from "../database/queries/addressQueries.js";

export const getAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const address = await selectAddress(userId);

    if (!address) {
      res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ address });
  } catch (error) {
    console.log("Database error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createAddress = async (req, res) => {
  try {
    const newAddressId = await insertAddress(req.body);
    res.status(201).json({ id: newAddressId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const updated = await updateAddress(addressId, req.body);

    if (updated === 0) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
