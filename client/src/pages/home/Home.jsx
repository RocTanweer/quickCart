import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Button } from "@mui/material";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { FlexBox } from "../../layouts";
import { axCli } from "../../lib/axiosClient";
import { cld } from "../../lib/cloudinaryInstance";
import MyCarousel from "./components/MyCarousel";
import {
  addFilter,
  resetFilters,
} from "../../state/slices/productsPublicSlice";

const heroImgUrl =
  "https://res.cloudinary.com/quickcartexpress/image/upload/v1712172617/QuickCartExpress/sel4dbwbwhwulguxoi6a.png";

const Home = () => {
  const [productCat, setProductCat] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const dispatch = useDispatch();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await axCli.get("/api/productCategories");
        setProductCat((prev) => [
          ...prev,
          ...response.data.productCategoriesList,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNewProducts = async () => {
      try {
        const response = await axCli.get("/api/newProducts");
        setNewProducts((prev) => [...prev, ...response.data.newProducts]);
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted.current) {
      fetchProductCategories();
      fetchNewProducts();
    }
  }, []);

  const handleCatBtns = async (pcID) => {
    try {
      dispatch(resetFilters());
      dispatch(addFilter({ filterType: "productCategories", value: pcID }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: "30px" }}>
      <FlexBox
        csx={{
          justifyContent: "flex-start",
          padding: "50px",
          height: "510px",
          width: "100%",
          mb: 15,
          backgroundImage: `url(${heroImgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#e6e6e6",
        }}
      >
        <Box sx={{ maxWidth: "500px", width: "100%" }}>
          <Typography variant="h3">
            Tech Essentials for Modern Living
          </Typography>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Unlock Your Digital Potential with Our Curated Tech Collection.
            Elevate Your Experience, Stay Connected in Style.
          </Typography>
          <Button variant="outlined" component={NavLink} to="/products">
            Explore
          </Button>
        </Box>
      </FlexBox>

      <Box sx={{ width: "100%", mb: 15 }}>
        <Typography variant="h4" textAlign="center" mb={7}>
          Shop by Categories
        </Typography>

        <FlexBox csx={{ flexWrap: "wrap", gap: 3 }}>
          {productCat &&
            productCat.map((pc) => (
              <Box
                key={pc.id}
                sx={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#e6e6e6",
                  textAlign: "center",
                }}
              >
                <img
                  src={cld
                    .image(pc.thumbnail)
                    .resize(fill().width(180).height(180))
                    .toURL()}
                  alt={pc.name}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  component={NavLink}
                  to="/products"
                  state={{ pcID: pc.id }}
                  onClick={() => handleCatBtns(pc.id)}
                >
                  {pc.name}
                </Button>
              </Box>
            ))}
        </FlexBox>
      </Box>
      <Box sx={{ width: "100%", mb: 15 }}>
        <Typography variant="h4" textAlign="center" mb={7}>
          New Collections
        </Typography>
        <Box>
          <MyCarousel newProducts={newProducts} />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
