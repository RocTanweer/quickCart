import { useState } from "react";

import { Box, Button, Menu, MenuItem } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { FlexBox } from "../layouts/";

const adminSections = {
  users: "Users",
  product: ["List", "Create", "Category", "Brand"],
  orders: "Order",
  payments: "Payments",
};

const AdminNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [btnText, setBtnText] = useState("Product");
  const [selectedSec, setSelectedSec] = useState(adminSections.users);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (txt = "Product") => {
    setAnchorEl(null);
    setBtnText(txt);
    if (txt !== "Product") setSelectedSec(txt);
  };

  const handleSecName = (secName) => {
    setSelectedSec(secName);
    setBtnText("Product");
  };

  const open = Boolean(anchorEl);

  return (
    <FlexBox csx={{ paddingX: "24px", justifyContent: "flex-start" }}>
      <Box sx={{ border: "1px solid", borderRadius: "8px" }}>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={selectedSec === adminSections.users ? "contained" : ""}
          onClick={() => handleSecName(adminSections.users)}
        >
          {adminSections.users}
        </Button>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={
            adminSections.product.includes(selectedSec) ? "contained" : ""
          }
          onClick={handleOpen}
          endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {btnText}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose(btnText)}
        >
          {adminSections.product.map((name) => (
            <MenuItem key={name} onClick={() => handleClose(name)}>
              {name}
            </MenuItem>
          ))}
        </Menu>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={selectedSec === adminSections.orders ? "contained" : ""}
          onClick={() => handleSecName(adminSections.orders)}
        >
          {adminSections.orders}
        </Button>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={selectedSec === adminSections.payments ? "contained" : ""}
          onClick={() => handleSecName(adminSections.payments)}
        >
          {adminSections.payments}
        </Button>
      </Box>
    </FlexBox>
  );
};

export default AdminNav;
