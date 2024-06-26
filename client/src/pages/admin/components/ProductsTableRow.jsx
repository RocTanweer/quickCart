import { useState } from "react";
import { useDispatch } from "react-redux";

import { TableRow, TableCell, Avatar, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawerFormProduct from "../layouts/subLayouts/DrawerFormProduct";
import {
  decrementProductsCount,
  deleteProduct,
  productsDeleteAsync,
} from "../../../state/slices/productsSlice";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

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
      dispatch(decrementProductsCount());
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
          src={cld
            .image(product.image)
            .resize(fill().width(200).height(200))
            .toURL()}
          variant="square"
          sx={{
            borderRadius: "11px",
            width: "70px",
            height: "70px",
          }}
        />
      </TableCell>
      <TableCell>
        {product.name.length > 52
          ? `${product.name.slice(0, 53)}...`
          : product.name}
      </TableCell>
      <TableCell>
        {product.description.length > 52
          ? `${product.description.slice(0, 53)}...`
          : product.description}
      </TableCell>
      <TableCell>{product.unit_price}</TableCell>
      <TableCell>{product.stock_quantity}</TableCell>
      <TableCell>{product.category_name}</TableCell>
      <TableCell>{product.brand_name}</TableCell>
      <TableCell sx={{ padding: "0px" }}>
        <IconButton onClick={handleDrawerOpen}>
          <EditIcon />
        </IconButton>
        {drawerOpen ? (
          <DrawerFormProduct
            open={drawerOpen}
            handleClose={handleDrawerClose}
            productDetails={product}
          />
        ) : null}
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
