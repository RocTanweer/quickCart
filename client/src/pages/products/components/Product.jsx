import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActionArea,
  CardActions,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { cld } from "../../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { formatValueLabel } from "../../../utils/function";
import {
  shoppingCartItemsCreateAsync,
  shoppingCartItemsListSelector,
} from "../../../state/slices/shoppingCartItemsSlice";
import { useState } from "react";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const cartItemsList = useSelector(shoppingCartItemsListSelector);

  const [loading, setLoading] = useState(false);

  const handleAddToCartBtn = async (productId) => {
    const shoppingCartId = localStorage.getItem("QCSCId");

    try {
      setLoading(true);
      await dispatch(
        shoppingCartItemsCreateAsync({
          shoppingCartId: shoppingCartId,
          productId,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let btnText;
  const productInCart = cartItemsList.some(
    (item) => item.product_id === product.id
  );
  if (loading === false && productInCart) {
    btnText = "Added";
  } else if (loading === false && !productInCart) {
    btnText = "Add";
  }

  return (
    <Grid item md={4} key={product.id}>
      <Card>
        <CardActionArea component={NavLink} to={`/products/${product.id}`}>
          <CardMedia
            component="img"
            image={cld
              .image(product.image)
              .resize(fill().width(250).height(220))
              .toURL()}
            height={"220px"}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ height: "64px" }}
            >
              {product.name.length > 34
                ? `${product.name.slice(0, 32)}...`
                : product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            {formatValueLabel(product.unit_price)}
          </Typography>
          <Button
            size="small"
            variant="outlined"
            endIcon={<AddShoppingCartIcon />}
            onClick={() => handleAddToCartBtn(product.id)}
            disabled={productInCart}
          >
            {loading === true && "Loading..."}
            {btnText}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Product;
