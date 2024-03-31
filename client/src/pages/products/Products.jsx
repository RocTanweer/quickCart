import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
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

import { cld } from "../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { FlexBox } from "../../layouts";
import {
  PRODUCT_ITEMS_PER_PAGE,
  productsPublicAsync,
  productsPublicSelector,
  productsPublicStatusSelector,
} from "../../state/slices/productsPublicSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsPublicSelector);
  const productsStatus = useSelector(productsPublicStatusSelector);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isMounted.current && products.length === 0) {
          await dispatch(
            productsPublicAsync({
              offset: 0,
              rowsCount: PRODUCT_ITEMS_PER_PAGE,
            })
          ).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [dispatch, products]);

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: "50px" }}>
      <Grid container columnSpacing={2}>
        <Grid item md={3} sx={{ border: "2px solid" }}></Grid>
        <Grid item md={9}>
          <FlexBox csx={{ justifyContent: "flex-end" }}>
            <p>Sort By</p>
          </FlexBox>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {(productsStatus === "idle" || productsStatus === "loading") && (
              <Typography>Loading...</Typography>
            )}
            {productsStatus === "succeeded" &&
              products.map((product) => (
                <Grid item md={4} key={product.id}>
                  <Card>
                    <CardActionArea>
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
                        <sup>&#x20B9;</sup>
                        {product.unit_price}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={<AddShoppingCartIcon />}
                      >
                        Add
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <FlexBox csx={{ justifyContent: "flex-end" }}>
            <p>Pagination</p>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
