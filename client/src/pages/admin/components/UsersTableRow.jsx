import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  MenuItem,
  Typography,
  TableCell,
  TableRow,
  Button,
  Box,
  Avatar,
  Chip,
} from "@mui/material";

import { FlexBox } from "../../../layouts";

import { userIdSelector } from "../../../state/slices/loginSlice";
import {
  updateUserRole,
  usersRoleUpdateAsync,
} from "../../../state/slices/usersSlice";

const UsersTableRow = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleChangeRole = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRoleMenu = async (newRole) => {
    try {
      if (newRole !== user.role) {
        const dataForUpdate = { userId: user.user_id, role: newRole };
        await dispatch(usersRoleUpdateAsync(dataForUpdate)).unwrap();
        dispatch(updateUserRole(dataForUpdate));
      }
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  };

  const menuItemStyles = (theme) => {
    return {
      borderRadius: "11px",
      color: `${
        user.role === "ADMIN"
          ? theme.palette.primary.main
          : theme.palette.info.main
      }`,
    };
  };

  return (
    <TableRow key={user.user_id}>
      <TableCell>{user.user_id}</TableCell>
      <TableCell>
        <FlexBox csx={{ justifyContent: "flex-start", gap: 1 }}>
          <Box>
            <Avatar alt={user.name} src={null} />
          </Box>
          <Box>
            <Typography variant="body2">{user.name}</Typography>
            <Typography variant="subtitle" color={"textSecondary"}>
              {user.email}
            </Typography>
          </Box>
        </FlexBox>
      </TableCell>
      <TableCell>
        {user.user_id === userId ? (
          <Chip color="info" label={user.role} />
        ) : (
          <Button
            variant="outlined"
            color={user.role === "ADMIN" ? "info" : "primary"}
            size="small"
            onClick={handleChangeRole}
          >
            {user.role}
          </Button>
        )}

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleCloseRoleMenu(user.role)}
        >
          <MenuItem
            sx={menuItemStyles}
            onClick={() =>
              handleCloseRoleMenu(user.role === "ADMIN" ? "USER" : "ADMIN")
            }
          >
            {user.role === "ADMIN" ? "USER" : "ADMIN"}
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default UsersTableRow;
