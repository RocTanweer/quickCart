import { useState } from "react";

import { Box, Button, Menu, MenuItem } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { FlexBox } from "../../../layouts";

import tabNames from "../constants/tabNames";

const Tabs = ({ activeSec, handleActiveSec }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [btnText, setBtnText] = useState("Product");

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (txt = "Product") => {
    setAnchorEl(null);
    setBtnText(txt);
    if (txt !== "Product") handleActiveSec(txt);
  };

  const handleSecName = (secName) => {
    handleActiveSec(secName);
    setBtnText("Product");
  };

  const open = Boolean(anchorEl);

  return (
    <FlexBox csx={{ paddingX: "24px", justifyContent: "flex-start" }}>
      <Box sx={{ border: "1px solid", borderRadius: "8px" }}>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={activeSec === tabNames.users ? "contained" : ""}
          onClick={() => handleSecName(tabNames.users)}
        >
          {tabNames.users}
        </Button>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={
            Object.values(tabNames.product).includes(activeSec)
              ? "contained"
              : ""
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
          {Object.values(tabNames.product).map((name) => (
            <MenuItem key={name} onClick={() => handleClose(name)}>
              {name}
            </MenuItem>
          ))}
        </Menu>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={activeSec === tabNames.orders ? "contained" : ""}
          onClick={() => handleSecName(tabNames.orders)}
        >
          {tabNames.orders}
        </Button>
        <Button
          sx={{ textTransform: "capitalize" }}
          variant={activeSec === tabNames.payments ? "contained" : ""}
          onClick={() => handleSecName(tabNames.payments)}
        >
          {tabNames.payments}
        </Button>
      </Box>
    </FlexBox>
  );
};

export default Tabs;
