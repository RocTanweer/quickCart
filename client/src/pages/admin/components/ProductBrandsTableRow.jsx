import { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { ModalFormProductBrand } from "../layouts/subLayouts";

const ProductBrandsTableRow = ({ brand }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TableRow>
      <TableCell>{brand.id}</TableCell>
      <TableCell>{brand.name}</TableCell>
      <TableCell sx={{ padding: "0px" }}>
        <IconButton onClick={handleOpenDialog}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <ModalFormProductBrand
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        formIntState={brand}
      />
    </TableRow>
  );
};

export default ProductBrandsTableRow;
