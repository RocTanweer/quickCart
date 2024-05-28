import { useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  TableCell,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlexBox } from "../../../layouts";
import { updateProductQuantity } from "../../../state/slices/shoppingCartItemsSlice";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { formatValueLabel } from "../../../utils/function";

const CartTableRow = ({ cartItem }) => {
  const dispatch = useDispatch();

  const handleChangeQuantity = (e) => {
    dispatch(
      updateProductQuantity({
        cartItemId: cartItem.product_id,
        newQuantity: +e.target.value,
      })
    );
  };

  return (
    <TableRow>
      <TableCell>
        <FlexBox csx={{ justifyContent: "flex-start" }}>
          <Avatar
            alt={cartItem.product_name}
            src={cld
              .image(cartItem.product_image)
              .resize(fill().width(200).height(200))
              .toURL()}
            variant="square"
            sx={{
              borderRadius: "11px",
              width: "70px",
              height: "70px",
              marginRight: "20px",
            }}
          />
          <Box>
            <Typography fontWeight="bold">{cartItem.product_name}</Typography>
            <Typography variant="subtitle2">
              {formatValueLabel(cartItem.product_price)}
            </Typography>
          </Box>
        </FlexBox>
      </TableCell>
      <TableCell>
        <TextField
          type="number"
          inputProps={{ min: 1, max: cartItem.product_stock_quantity }}
          value={cartItem.product_quantity}
          onChange={handleChangeQuantity}
        />
      </TableCell>
      <TableCell>
        <Typography>
          {formatValueLabel(cartItem.product_quantity * cartItem.product_price)}
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton color="error" onClick={null}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CartTableRow;
