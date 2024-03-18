import { Typography, Box } from "@mui/material";

import { ProductForm } from "../../admin/components";

const ProductCreate = () => {
  return (
    <Box sx={{ maxWidth: "500px", width: "100%", mt: "40px" }}>
      <Typography variant="h4" textAlign="left" component="h2" mb="25px">
        Create New Product
      </Typography>
      <ProductForm />
    </Box>
  );
};

export default ProductCreate;
