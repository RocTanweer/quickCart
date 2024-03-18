import { useState } from "react";
import { useDispatch } from "react-redux";

import { TableRow, TableCell, Avatar, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawerFormProduct from "../layouts/subLayouts/DrawerFormProduct";
import {
  deleteProduct,
  productsDeleteAsync,
} from "../../../state/slices/productsSlice";

const ProductsTableRow = ({ product, setDeletedProductsCount }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDeleteBtn = async () => {
    try {
      await dispatch(productsDeleteAsync(product.id)).unwrap();
      dispatch(deleteProduct({ id: product.id }));
      setDeletedProductsCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>
        <Avatar
          alt={product.name}
          src={product.image}
          variant="square"
          sx={{ borderRadius: "11px", width: "70px", height: "70px" }}
        />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.unit_price}</TableCell>
      <TableCell>{product.stock_quantity}</TableCell>
      <TableCell>{product.category_name}</TableCell>
      <TableCell>{product.brand_name}</TableCell>
      <TableCell sx={{ padding: "0px" }}>
        <IconButton onClick={handleDrawerOpen}>
          <EditIcon />
        </IconButton>
        <DrawerFormProduct
          open={drawerOpen}
          handleClose={handleDrawerClose}
          productDetails={product}
        />
      </TableCell>
      <TableCell sx={{ padding: "0px" }}>
        <IconButton color="error" onClick={handleDeleteBtn}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
