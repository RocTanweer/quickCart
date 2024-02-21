import { useState } from "react";
import { useDispatch } from "react-redux";

import { TablePagination } from "@mui/material";

import { ROWS_PER_PAGE, userTableCols } from "../constants/tablesData";

const CustomPagination = ({ page, setPage, totalRows, handleFetchData }) => {
  const [latestPage, setLatestPage] = useState(0);
  const dispatch = useDispatch();

  const handleChangePage = async (event, newPage) => {
    try {
      if (newPage > page && page === latestPage) {
        await dispatch(
          handleFetchData({ page: newPage + 1, pageSize: ROWS_PER_PAGE })
        ).unwrap();

        setLatestPage(newPage);
        setPage(newPage);
      }
      setPage(newPage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TablePagination
      rowsPerPageOptions={[]}
      colSpan={userTableCols.length}
      count={totalRows}
      rowsPerPage={ROWS_PER_PAGE}
      page={page}
      onPageChange={handleChangePage}
    />
  );
};

export default CustomPagination;
