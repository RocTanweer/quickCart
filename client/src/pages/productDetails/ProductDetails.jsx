import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { axCli } from "../../lib/axiosClient";
import { FlexBox } from "../../layouts";
import { MyCarousel } from "../../components";

import { cld } from "../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { formatValueLabel } from "../../utils/function";
import RelatedProductCard from "./components/RelatedProductCard";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  const { productId } = useParams();
  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      try {
        const response = await axCli.get(`/api/products/${productId}`);
        setProductDetails(response.data.productDetails);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRelatedProducts = async (productId) => {
      try {
        const response = await axCli.get(`/api/relatedProducts/${productId}`);
        setRelatedProducts(response.data.relatedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted.current && productId) {
      fetchProductDetails(productId);
      fetchRelatedProducts(productId);
    }
  }, [productId]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 134px)",
        maxWidth: "1000px",
        mx: "auto",
        pt: 5,
      }}
    >
      <FlexBox csx={{ gap: 5, mb: 15 }}>
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${cld
              .image(productDetails?.image)
              .resize(fill().width(500).height(350))
              .toURL()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "350px",
          }}
        ></Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {productDetails?.name}
          </Typography>
          <Typography color="textSecondary" mb={2}>
            <Typography component="span">
              {productDetails?.category_name} by {productDetails?.brand_name} |
            </Typography>
            <Typography
              color={
                productDetails?.stock_quantity > 0
                  ? "success.main"
                  : "error.main"
              }
              component="span"
            >
              {productDetails?.stock_quantity > 0
                ? " In Stock"
                : " Out of Stock"}
            </Typography>
          </Typography>
          <Typography fontWeight="bold" mb={3}>
            {formatValueLabel(productDetails?.unit_price)}
          </Typography>
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Description
            </Typography>
            <Typography>{productDetails?.description}</Typography>
          </Box>
          <Box>
            <Button variant="contained" fullWidth>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </FlexBox>

      <Box mb={5}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Related Products
        </Typography>
        {relatedProducts && (
          <MyCarousel
            products={relatedProducts}
            cardComponent={RelatedProductCard}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
