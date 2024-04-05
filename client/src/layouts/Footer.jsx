import { Container, Box, Typography, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";

import { NavLink } from "react-router-dom";

import FlexBox from "../layouts/FlexBox";

const Footer = () => {
  return (
    <Box bgcolor="primary.main" color="secondary.main" py="15px">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FlexBox>
          <ShoppingCartIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QuickCart
          </Typography>
        </FlexBox>

        <Typography color="secondary.main" variant="subtitle2">
          © 2024 QuickCart. All rights reserved.
        </Typography>

        <Box>
          <IconButton
            component={NavLink}
            to="https://github.com/RocTanweer/quickCart"
          >
            <GitHubIcon color="secondary" />
          </IconButton>
          <IconButton component={NavLink} to="https://twitter.com/roc_tanweer">
            <XIcon color="secondary" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
