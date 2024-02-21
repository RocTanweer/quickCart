import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableFooter,
  TableContainer,
} from "@mui/material";

import {
  usersListAsync,
  usersCountAsync,
  usersListSelector,
  usersCountSelector,
  usersListStatusSelector,
  usersCountStatusSelector,
} from "../../../state/slices/usersSlice";

import { TableLoading, UsersTableRow, CustomPagination } from "../components";
import { ROWS_PER_PAGE, userTableCols } from "../constants/tablesData";

const Users = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const usersList = useSelector(usersListSelector);
  const usersCount = useSelector(usersCountSelector);
  const usersListStatus = useSelector(usersListStatusSelector);
  const usersCountStatus = useSelector(usersCountStatusSelector);
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

  const visibleRows = usersList.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

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
              <UsersTableRow key={user.user_id} user={user} />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {usersCountStatus === "succeeded" && (
              <CustomPagination
                page={page}
                setPage={setPage}
                totalRows={usersCount}
                handleFetchData={usersListAsync}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default Users;
