import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  MenuItem,
  TableContainer,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableFooter,
  Button,
  Chip,
  Box,
  Avatar,
} from "@mui/material";

import {
  usersListAsync,
  usersCountAsync,
  usersListSelector,
  usersCountSelector,
  usersListStatusSelector,
  usersCountStatusSelector,
} from "../../../state/slices/usersSlice";

import { FlexBox } from "../../../layouts";
import { TableLoading } from "../components";
import { ROWS_PER_PAGE, userTableCols } from "../constants/tablesData";

const Users = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleChangeRole = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRoleMenu = (role) => {
    setAnchorEl(null);
    console.log(role);
  };

  const [page, setPage] = useState(0);
  const [latestPage, setLatestPage] = useState(0);
  const dispatch = useDispatch();
  const usersList = useSelector(usersListSelector);
  const visibleRows = usersList.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );
  const usersCount = useSelector(usersCountSelector);
  const usersListStatus = useSelector(usersListStatusSelector);
  const usersCountStatus = useSelector(usersCountStatusSelector);

  const handleChangePage = async (event, newPage) => {
    try {
      if (newPage > page && page === latestPage) {
        await dispatch(
          usersListAsync({ page: newPage + 1, pageSize: ROWS_PER_PAGE })
        ).unwrap();

        setLatestPage(newPage);
        setPage(newPage);
      }
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  };

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (isMounted.current) {
          await dispatch(
            usersListAsync({ page: 1, pageSize: ROWS_PER_PAGE })
          ).unwrap();
          await dispatch(usersCountAsync()).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, [dispatch]);

  return (
    <TableContainer
      sx={{ maxWidth: "500px", width: "100%", minHeight: "500px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {userTableCols.map((col) => (
              <TableCell key={col}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(usersListStatus === "loading" || usersListStatus === "idle") && (
            <TableLoading />
          )}
          {usersListStatus === "succeeded" &&
            visibleRows.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell>{user.user_id}</TableCell>
                <TableCell>
                  <FlexBox csx={{ justifyContent: "flex-start", gap: 1 }}>
                    <Box>
                      <Avatar alt={user.name} src="/papa" />
                    </Box>
                    <Box>
                      <Typography variant="body2">{user.name}</Typography>
                      <Typography variant="subtitle" color={"textSecondary"}>
                        {user.email}
                      </Typography>
                    </Box>
                  </FlexBox>
                </TableCell>
                <TableCell
                  sx={(theme) => {
                    return {
                      color: theme.palette.primary.main,
                    };
                  }}
                >
                  <Button onClick={handleChangeRole}>
                    <Chip label={user.role} />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleCloseRoleMenu("USER")}
                  >
                    <MenuItem onClick={() => handleCloseRoleMenu("ADMIN")}>
                      ADMIN
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {usersCountStatus === "succeeded" && (
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={usersCount}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Users;
