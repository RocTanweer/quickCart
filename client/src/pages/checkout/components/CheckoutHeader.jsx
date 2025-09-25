import { NavLink } from "react-router-dom";

import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";

import { FlexBox } from "../../../layouts";

const CheckoutHeader = () => {
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl" sx={{ mt: "10px" }}>
        <Toolbar disableGutters>
          <FlexBox csx={{ width: "100%", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QuickCart
            </Typography>
            <Typography variant="h3">Checkout</Typography>
            <Button component={NavLink} to="/cart" variant="contained">
              Edit Cart
            </Button>
          </FlexBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CheckoutHeader;
