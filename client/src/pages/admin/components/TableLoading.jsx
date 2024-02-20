import { Skeleton, TableRow, TableCell } from "@mui/material";

import { ROWS_PER_PAGE } from "../constants/tablesData";

const TableLoading = () => {
  return (
    <>
      {Array.from({ length: ROWS_PER_PAGE }).map((_, index) => (
        <TableRow key={index}>
          <TableCell sx={{ padding: "0px" }} colSpan={3}>
            <Skeleton sx={{ height: "77px" }} animation="wave" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableLoading;
