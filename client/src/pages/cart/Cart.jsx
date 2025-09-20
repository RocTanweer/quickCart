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
  Button,
} from "@mui/material";

import {
  shoppingCartItemsListSelector,
  shoppingCartItemsListStatusSelector,
} from "../../state/slices/shoppingCartItemsSlice";
import { FlexBox } from "../../layouts";
import { TableLoading } from "../admin/components";
import CartTableRow from "./components/CartTableRow";
import { formatValueLabel } from "../../utils/function";
import { NavLink } from "react-router-dom";
const tableCols = ["Products", "Quantity"];

const emptyCartImage =
  "https://res.cloudinary.com/quickcartexpress/image/upload/v1758090907/Emptystates_Empty_Cart_hglxi3.svg";

const Cart = () => {
  const cartItemsList = useSelector(shoppingCartItemsListSelector);
  const cartItemsListStatus = useSelector(shoppingCartItemsListStatusSelector);

  const subTotal = cartItemsList.reduce(
    (acc, item) => acc + item.product_price * item.product_quantity,
    0
  );

  return (
    <Box sx={{ maxWidth: "1024px", mx: "auto", mt: "30px" }}>
      {cartItemsList.length === 0 && (
        <FlexBox
          csx={{
            width: "100%",
            height: "calc(100vh - 350px)",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box component="img" src={emptyCartImage} />
          <Button variant="outlined" component={NavLink} to={"/products"}>
            Shop Now
          </Button>
        </FlexBox>
      )}
      {cartItemsList.length !== 0 && (
        <>
          <Typography component="h1" variant="h4" mb={2}>
            Cart
          </Typography>
          <FlexBox csx={{ gap: "24px", alignItems: "flex-start" }}>
            <TableContainer sx={{ maxWidth: "700px" }}>
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
            <FlexBox
              csx={{
                width: "300px",
                height: "200px",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <FlexBox csx={{ width: "100%", justifyContent: "space-between" }}>
                <Typography variant="h5">Subtotal:</Typography>
                <Typography fontSize={25} sx={{ opacity: 0.9 }}>
                  {formatValueLabel(subTotal)}
                </Typography>
              </FlexBox>

              <Button
                variant="contained"
                fullWidth
                component={NavLink}
                to={"/checkout"}
              >
                Checkout
              </Button>
            </FlexBox>
          </FlexBox>
        </>
      )}
    </Box>
  );
};

export default Cart;
