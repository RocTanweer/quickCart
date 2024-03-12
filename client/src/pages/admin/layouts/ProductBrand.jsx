import { useState, useEffect, useRef } from "react";
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
import { ModalFormProductBrand } from "./subLayouts";

import { productBrandTableCols, ROWS_PER_PAGE } from "../constants/tablesData";

import {
  productBrandsListSelector,
  productBrandsCountSelector,
  productBrandsListStatusSelector,
  productBrandsCountStatusSelector,
  availableProductBrandsCountSelector,
  productBrandsListAsync,
  productBrandsCountAsync,
} from "../../../state/slices/productBrandsSlice";

import {
  TableLoading,
  CustomPagination,
  ProductBrandsTableRow,
} from "../components";

const ProductBrand = () => {
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const productBrandsList = useSelector(productBrandsListSelector);
  const productBrandsListStatus = useSelector(productBrandsListStatusSelector);
  const productBrandsCount = useSelector(productBrandsCountSelector);
  const productBrandsCountStatus = useSelector(
    productBrandsCountStatusSelector
  );
  const availableProductBrandsCount = useSelector(
    availableProductBrandsCountSelector
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
        if (isMounted.current && availableProductBrandsCount === 0) {
          await dispatch(
            productBrandsListAsync({ offSet: 0, rowsCount: ROWS_PER_PAGE })
          ).unwrap();
          await dispatch(productBrandsCountAsync()).unwrap();
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
  const visibleRows = productBrandsList.slice(
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
        <ModalFormProductBrand
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      </FlexBox>
      <Table>
        <TableHead>
          <TableRow>
            {productBrandTableCols.map((col, i) => (
              <TableCell key={i}>{col}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(productBrandsListStatus === "idle" ||
            productBrandsListStatus === "loading") && <TableLoading />}
          {productBrandsListStatus === "succeeded" &&
            visibleRows.map((brand) => (
              <ProductBrandsTableRow key={brand.id} brand={brand} />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {productBrandsCountStatus === "succeeded" && (
              <CustomPagination
                page={page}
                setPage={setPage}
                totalRows={productBrandsCount}
                handleFetchData={productBrandsListAsync}
                currentRows={availableProductBrandsCount}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ProductBrand;
