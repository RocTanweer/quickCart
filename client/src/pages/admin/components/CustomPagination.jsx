import { useState } from "react";
import { useDispatch } from "react-redux";

import { TablePagination } from "@mui/material";

import { ROWS_PER_PAGE } from "../constants/tablesData";

const CustomPagination = ({
  page,
  setPage,
  totalRows,
  handleFetchData,
  currentRows,
  deletedUsersCount,
  setDeletedUsersCount,
}) => {
  const [latestPage, setLatestPage] = useState(0);
  const dispatch = useDispatch();

  const handleChangePage = async (event, newPage) => {
    try {
      if (newPage > page && page === latestPage) {
        await dispatch(
          handleFetchData({
            offset: currentRows,
            rowsCount: deletedUsersCount + ROWS_PER_PAGE,
          })
        ).unwrap();

        setLatestPage(newPage);
        setPage(newPage);
        setDeletedUsersCount(0);
      }
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TablePagination
      rowsPerPageOptions={[]}
      count={totalRows}
      rowsPerPage={ROWS_PER_PAGE}
      page={page}
      onPageChange={handleChangePage}
    />
  );
};

export default CustomPagination;
