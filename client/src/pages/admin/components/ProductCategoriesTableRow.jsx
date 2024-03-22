import { useState } from "react";
import { TableRow, TableCell, Avatar, IconButton } from "@mui/material";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import EditIcon from "@mui/icons-material/Edit";
import { ModalFormProductCategory } from "../layouts/subLayouts";

const ProductCategoriesTableRow = ({ category }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TableRow key={category.id}>
      <TableCell>{category.id}</TableCell>
      <TableCell>
        <Avatar
          alt={`${category.name} image`}
          src={cld
            .image(category.thumbnail)
            .resize(fill().width(200).height(200))
            .toURL()}
          variant="square"
          sx={{ borderRadius: "11px", width: "70px", height: "70px" }}
        />
      </TableCell>
      <TableCell>{category.name}</TableCell>
      <TableCell sx={{ padding: "0px" }}>
        <IconButton onClick={handleOpenDialog}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <ModalFormProductCategory
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        formIntState={category}
      />
    </TableRow>
  );
};

export default ProductCategoriesTableRow;
