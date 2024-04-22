import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Typography } from "@mui/material";
import { shoppingCartItemsListAsync } from "../../state/slices/shoppingCartItemsSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    const fetchShoppingCartItems = async () => {
      try {
        // await dispatch(shoppingCartItemsListAsync({ shoppingCartId })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted.current) {
      fetchShoppingCartItems();
    }
  }, [dispatch, shoppingCartId]);

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: "30px" }}>
      <Typography variant="h3">Cart</Typography>
    </Box>
  );
};

export default Cart;
