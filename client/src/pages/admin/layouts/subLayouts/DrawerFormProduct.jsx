import { Drawer, Typography } from "@mui/material";
import ProductForm from "../../components/ProductForm";

const DrawerFormProduct = ({ open, handleClose, productDetails }) => {
  return (
    <Drawer
      anchor="right"
      PaperProps={{ style: { padding: "30px" } }}
      open={open}
      onClose={handleClose}
      variant="persistent"
    >
      <Typography variant="h4" textAlign="left" component="h2" mb="25px">
        Update Product
      </Typography>
      <Typography
        variant="subtitle"
        sx={{ mb: "10px" }}
        color={"textSecondary"}
      >
        Product ID: {productDetails.id}
      </Typography>

      <ProductForm
        formIntState={productDetails}
        handleDrawerClose={handleClose}
      />
    </Drawer>
  );
};

export default DrawerFormProduct;
