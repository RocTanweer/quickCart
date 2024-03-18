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
  Button,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { FlexBox } from "../../../layouts";

import { productsTableCols, ROWS_PER_PAGE } from "../constants/tablesData";
import tabNames from "../constants/tabNames";
import {
  availableProductsCountSelector,
  productsCountAsync,
  productsCountSelector,
  productsCountStatusSelector,
  productsListAsync,
  productsListSelector,
  productsListStatusSelector,
} from "../../../state/slices/productsSlice";
import {
  CustomPagination,
  TableLoading,
  ProductsTableRow,
} from "../components";

const ProductList = ({ handleActiveSec, setBtnText }) => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const productsList = useSelector(productsListSelector);
  const productsListStatus = useSelector(productsListStatusSelector);
  const productsCount = useSelector(productsCountSelector);
  const productsCountStatus = useSelector(productsCountStatusSelector);
  const availableProductsCount = useSelector(availableProductsCountSelector);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        if (isMounted.current && productsList.length === 0) {
          await dispatch(
            productsListAsync({ offset: 0, rowsCount: ROWS_PER_PAGE })
          ).unwrap();
          await dispatch(productsCountAsync()).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductsList();
  }, [dispatch, productsList]);

  const handleAddBtn = () => {
    handleActiveSec(tabNames.product.create);
    setBtnText(tabNames.product.create);
  };

  const visibleRows = productsList.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  return (
    <Box
      sx={{ maxWidth: "500px", width: "100%", minHeight: "500px", mt: "40px" }}
    >
      <FlexBox csx={{ justifyContent: "flex-end", mb: "20px" }}>
        <Button variant="outlined" endIcon={<AddIcon />} onClick={handleAddBtn}>
          Add
        </Button>
      </FlexBox>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {productsTableCols.map((col, i) => (
                <TableCell key={i}>{col}</TableCell>
              ))}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(productsListStatus === "idle" ||
              productsListStatus === "loading") && <TableLoading />}
            {productsListStatus === "succeeded" &&
              visibleRows.map((product) => (
                <ProductsTableRow key={product.id} product={product} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableFooter>
          <TableRow>
            {productsCountStatus === "succeeded" && (
              <CustomPagination
                page={page}
                setPage={setPage}
                totalRows={productsCount}
                handleFetchData={productsListAsync}
                currentRows={availableProductsCount}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};

export default ProductList;
