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
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { FlexBox } from "../../../layouts";
import {
  productCategoryTableCols,
  ROWS_PER_PAGE,
} from "../constants/tablesData";
import {
  productCategoriesCountAsync,
  productCategoriesListAsync,
  productCategoriesListSelector,
  productCategoriesCountSelector,
  productCategoriesListStatusSelector,
  productCategoriesCountStatusSelector,
  availableProductCategoriesCountSelector,
} from "../../../state/slices/productCategoriesSlice";
import {
  TableLoading,
  CustomPagination,
  ProductCategoriesTableRow,
} from "../components";
import { ModalFormProductCategory } from "./subLayouts";

const ProductCategory = () => {
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const productCategoriesList = useSelector(productCategoriesListSelector);
  const productCategoriesListStatus = useSelector(
    productCategoriesListStatusSelector
  );
  const productCategoriesCount = useSelector(productCategoriesCountSelector);
  const productCategoriesCountStatus = useSelector(
    productCategoriesCountStatusSelector
  );
  const availableProductCategoriesCount = useSelector(
    availableProductCategoriesCountSelector
  );

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getProductCategories = async () => {
      try {
        if (isMounted.current && availableProductCategoriesCount === 0) {
          await dispatch(
            productCategoriesListAsync({ offSet: 0, rowsCount: ROWS_PER_PAGE })
          ).unwrap();
          await dispatch(productCategoriesCountAsync()).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProductCategories();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const visibleRows = productCategoriesList.slice(
    page * ROWS_PER_PAGE,
    (page + 1) * ROWS_PER_PAGE
  );

  return (
    <TableContainer
      sx={{ maxWidth: "500px", width: "100%", minHeight: "500px" }}
    >
      <FlexBox csx={{ justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add
        </Button>
        <ModalFormProductCategory
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      </FlexBox>
      <Table>
        <TableHead>
          <TableRow>
            {productCategoryTableCols.map((col, i) => (
              <TableCell key={i}>{col}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(productCategoriesListStatus === "idle" ||
            productCategoriesListStatus === "loading") && <TableLoading />}
          {productCategoriesListStatus === "succeeded" &&
            visibleRows.map((category) => (
              <ProductCategoriesTableRow
                key={category.id}
                category={category}
              />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {productCategoriesCountStatus === "succeeded" && (
              <CustomPagination
                page={page}
                setPage={setPage}
                totalRows={productCategoriesCount}
                handleFetchData={productCategoriesListAsync}
                currentRows={availableProductCategoriesCount}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductCategory;
