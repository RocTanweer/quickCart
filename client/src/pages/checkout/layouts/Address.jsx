import { Box, Typography } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddressForm from "../components/AddressForm";
import AddressCard from "../components/AddressCard";
import { userIdSelector } from "../../../state/slices/loginSlice";
import {
  addressDetailsSelector,
  addressGetAsync,
} from "../../../state/slices/addressSlice";

const Address = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);
  const addressDetails = useSelector(addressDetailsSelector);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        await dispatch(addressGetAsync({ userId })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddress();
  }, [dispatch, userId]);

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "10px",
        borderColor: (theme) => theme.palette.grey[400],
        padding: "30px",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Address
      </Typography>

      {!addressDetails && <AddressForm />}

      {addressDetails && <AddressCard address={addressDetails} />}
    </Box>
  );
};

export default Address;
