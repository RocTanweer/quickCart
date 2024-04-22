import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { userRoleSelector } from "../state/slices/loginSlice";
import { logoutAsync } from "../state/slices/logoutSlice";
import { isLoggedIn } from "../utils/function";

import {
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  AppBar,
  Box,
  Toolbar,
  Divider,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FlexBox from "./FlexBox";

const pages = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/products",
    name: "Products",
  },
];

const userMenu = [
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
    path: "/profile/:name",
  },
  {
    name: "Admin",
    icon: <AdminPanelSettingsIcon />,
    path: "/admin",
  },
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userRole = useSelector(userRoleSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync()).unwrap;
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUserMenu =
    userRole === "ADMIN"
      ? userMenu
      : userMenu.filter((item) => item.name !== "Admin");

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ path, name }) => (
                <MenuItem key={`${path}/${name}`} onClick={handleCloseNavMenu}>
                  <Typography
                    to={path}
                    component={NavLink}
                    sx={{
                      color: "inherit",
                      textDecoration: `${
                        location.pathname === path ? "underline" : "none"
                      }`,
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <ShoppingCartIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QuickCart
          </Typography>
          <Box
            sx={{ flexGrow: 1, gap: 2, display: { xs: "none", md: "flex" } }}
          >
            {pages.map(({ path, name }) => (
              <Typography
                component={NavLink}
                key={`${path}/${name}`}
                to={path}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "inherit",
                  textDecoration: `${
                    location.pathname === path ? "underline" : "none"
                  }`,
                }}
              >
                {name}
              </Typography>
            ))}
          </Box>

          {isLoggedIn() && (
            <FlexBox csx={{ flexGrow: 0, gap: 1.5 }}>
              <IconButton component={NavLink} to="/cart">
                <ShoppingCartIcon />
              </IconButton>
              <Box>
                <Tooltip title="Open user menu">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Tanweer" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {filteredUserMenu.map(({ name, icon, path }) => (
                    <MenuItem
                      sx={{ padding: "0px" }}
                      key={name}
                      onClick={handleCloseUserMenu}
                    >
                      <Button
                        sx={{
                          color: "inherit",
                        }}
                        fullWidth
                        variant="Outlined"
                        component={NavLink}
                        to={path}
                        startIcon={icon}
                      >
                        {name}
                      </Button>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem
                    sx={{ padding: "0px" }}
                    onClick={handleCloseUserMenu}
                  >
                    <Button
                      onClick={handleLogout}
                      fullWidth
                      startIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </FlexBox>
          )}

          {!isLoggedIn() && (
            <>
              <Button component={NavLink} to={"/signup"} variant="outlined">
                Signup
              </Button>
              <Button
                component={NavLink}
                to={"/login"}
                sx={{ ml: 1 }}
                variant="contained"
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
