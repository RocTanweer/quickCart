import { Box } from "@mui/material";

import CheckoutHeader from "./components/CheckoutHeader";
import Address from "./layouts/Address";

const Checkout = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />
      <Box sx={{ maxWidth: "700px", mx: "auto", mt: "50px" }}>
        <Address />
      </Box>
    </Box>
  );
};

export default Checkout;
