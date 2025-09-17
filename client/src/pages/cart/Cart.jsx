import { useSelector } from "react-redux";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import {
  shoppingCartItemsListSelector,
  shoppingCartItemsListStatusSelector,
} from "../../state/slices/shoppingCartItemsSlice";
import { FlexBox } from "../../layouts";
import { TableLoading } from "../admin/components";
import CartTableRow from "./components/CartTableRow";

const tableCols = ["Products", "Quantity"];

const Cart = () => {
  const cartItemsList = useSelector(shoppingCartItemsListSelector);
  const cartItemsListStatus = useSelector(shoppingCartItemsListStatusSelector);

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: "30px" }}>
      <Typography component="h1" variant="h4" mb={2}>
        Cart
      </Typography>
      <FlexBox>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {tableCols.map((col, i) => (
                  <TableCell key={i}>{col}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cartItemsListStatus === "idle" ||
                cartItemsListStatus === "loading") && <TableLoading />}
              {cartItemsList.map((cartItem, i) => (
                <CartTableRow key={i} cartItem={cartItem} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Box>Summary</Box> */}
      </FlexBox>
    </Box>
  );
};

export default Cart;
