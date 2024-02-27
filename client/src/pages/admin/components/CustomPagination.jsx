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
  deletedRowsCount = 0,
  handleDeletedRowsCount = null,
}) => {
  const [latestPage, setLatestPage] = useState(0);
  const dispatch = useDispatch();

  const handleChangePage = async (event, newPage) => {
    try {
      if (
        newPage > page &&
        page === latestPage &&
        (newPage + 1) * ROWS_PER_PAGE > currentRows
      ) {
        await dispatch(
          handleFetchData({
            offset: currentRows,
            rowsCount: deletedRowsCount + ROWS_PER_PAGE,
          })
        ).unwrap();

        setLatestPage(newPage);
        setPage(newPage);
        if (handleDeletedRowsCount) handleDeletedRowsCount(0);
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
