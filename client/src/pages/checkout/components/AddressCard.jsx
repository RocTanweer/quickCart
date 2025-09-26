import { Box, Button, Typography } from "@mui/material";
import { FlexBox } from "../../../layouts";

const AddressCard = ({ address, handleCurrAddEdit }) => {
  return (
    <Box csx={{ flexDirection: "column" }}>
      <Typography variant="h6">{address.name}</Typography>
      <Typography variant="body2">{`${address.address_line_1}, ${address.address_line_2}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pin_code}`}</Typography>
      <Typography variant="body2">{`Mobile: ${address.mobile}`}</Typography>
      <FlexBox csx={{ justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => handleCurrAddEdit(address)}>
          Edit
        </Button>
      </FlexBox>
    </Box>
  );
};

export default AddressCard;
