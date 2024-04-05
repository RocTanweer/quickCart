import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Menu,
  MenuItem,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

import { cld } from "../../lib/cloudinaryInstance";
import { fill } from "@cloudinary/url-gen/actions/resize";

import { FlexBox } from "../../layouts";
import {
  addFilter,
  PRODUCT_ITEMS_PER_PAGE,
  productsCountSelector,
  productsFilter,
  productsPublicAsync,
  productsPublicSelector,
  productsPublicStatusSelector,
  removeFilter,
  resetState,
  sortProducts,
  sortTypeSelector,
  updateSortType,
} from "../../state/slices/productsPublicSlice";
import { axCli } from "../../lib/axiosClient";

const generateQueryString = (obj) => {
  let qs = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((val) => {
        qs += `&${key}=${val}`;
      });
    } else {
      qs += `&${key}=${value}`;
    }
  });
  return qs;
};

const sortMenuData = [
  {
    name: "Most relevant",
    code: "mr",
  },
  {
    name: "Price low to high",
    code: "plh",
  },
  {
    name: "Price high to low",
    code: "phl",
  },
];

const Products = () => {
  const [page, setPage] = useState(1);
  const [productCategories, setProductCategories] = useState([]);
  const [productBrands, setProductBrands] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(productsPublicSelector);
  const productsCount = useSelector(productsCountSelector);
  const productsStatus = useSelector(productsPublicStatusSelector);
  const filters = useSelector(productsFilter);
  const sortType = useSelector(sortTypeSelector);
  const [initFilters, setInitFilters] = useState(filters);

  const location = useLocation();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(
          productsPublicAsync({
            offset: 0,
            rowsCount: PRODUCT_ITEMS_PER_PAGE,
            filters: "",
          })
        ).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted.current && products.length === 0 && !location.state?.pcID) {
      fetchProducts();
    }

    dispatch(sortProducts({ sortType: sortType }));
  }, [dispatch, products, sortType, location]);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await axCli.get("/api/productCategories");
        setProductCategories((prev) => [
          ...prev,
          ...response.data.productCategoriesList,
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchProductBrands = async () => {
      try {
        const response = await axCli.get("/api/productBrands");
        setProductBrands((prev) => [...prev, ...response.data.brandList]);
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted.current) {
      fetchProductCategories();
      fetchProductBrands();
    }
  }, []);

  const handleLftPgBtn = () => {
    setPage((prev) => prev - 1);
  };

  const handleRgtPgBtn = async () => {
    try {
      if (
        (page + 1) * PRODUCT_ITEMS_PER_PAGE > products.length &&
        products.length !== productsCount
      ) {
        const qs = generateQueryString(filters);
        await dispatch(
          productsPublicAsync({
            offset: products.length,
            rowsCount: PRODUCT_ITEMS_PER_PAGE,
            filters: qs,
          })
        ).unwrap();
      }
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePriceRange = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      dispatch(addFilter({ filterType: "minPrice", value: newValue[0] }));
    } else {
      dispatch(addFilter({ filterType: "maxPrice", value: newValue[1] }));
    }
  };

  const handleFilterBoxes = (event, value) => {
    if (event.target.checked) {
      dispatch(
        addFilter({
          filterType: event.target.dataset.filtertype,
          value,
        })
      );
    } else {
      dispatch(
        removeFilter({ filterType: event.target.dataset.filtertype, value })
      );
    }
  };

  const handleApplyFilter = useCallback(async () => {
    try {
      const qs = generateQueryString(filters);
      dispatch(resetState());
      await dispatch(
        productsPublicAsync({
          offset: 0,
          rowsCount: PRODUCT_ITEMS_PER_PAGE,
          filters: qs,
        })
      ).unwrap();
      setInitFilters(filters);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, filters]);

  useEffect(() => {
    if (isMounted.current && location.state?.pcID) {
      handleApplyFilter();
      location.state = {};
    }
  }, [location, handleApplyFilter]);

  const handleSortBtn = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuItems = (event) => {
    dispatch(sortProducts({ sortType: event.target.dataset.sorttype }));
    dispatch(updateSortType({ sortType: event.target.dataset.sorttype }));
    setAnchorEl(null);
  };

  const formatValueLabel = (value) => {
    // Format the value with currency symbol
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const visibleProducts = products.slice(
    (page - 1) * PRODUCT_ITEMS_PER_PAGE,
    page * PRODUCT_ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: "50px" }}>
      <Grid container>
        <Grid component={"form"} item md={3} sx={{ pl: "20px", pr: "20px" }}>
          <Box mb={2}>
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Product Categories
            </Typography>
            {productCategories &&
              productCategories.map((pc) => (
                <FormGroup key={pc.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        inputProps={{ "data-filtertype": "productCategories" }}
                        checked={filters.productCategories.includes(pc.id)}
                        onChange={(e) => handleFilterBoxes(e, pc.id)}
                      />
                    }
                    label={pc.name}
                    labelPlacement="start"
                    sx={{
                      justifyContent: "space-between",
                      ml: 0,
                    }}
                  />
                </FormGroup>
              ))}
          </Box>
          <Box mb={2}>
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Product Brands
            </Typography>
            {productBrands &&
              productBrands.map((pb) => (
                <FormGroup key={pb.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        inputProps={{ "data-filtertype": "productBrands" }}
                        checked={filters.productBrands.includes(pb.id)}
                        onChange={(e) => handleFilterBoxes(e, pb.id)}
                      />
                    }
                    label={pb.name}
                    labelPlacement="start"
                    sx={{
                      justifyContent: "space-between",
                      ml: 0,
                    }}
                  />
                </FormGroup>
              ))}
          </Box>
          <Box mb={2}>
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Price Range
            </Typography>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={[filters.minPrice, filters.maxPrice]}
              onChange={handlePriceRange}
              valueLabelDisplay="auto"
              disableSwap
              min={0}
              max={500000}
              step={1000}
              valueLabelFormat={formatValueLabel}
            />
          </Box>
          <Box mb={3}>
            <Typography variant="h7" sx={{ fontWeight: "bold" }}>
              Availability
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    inputProps={{ "data-filtertype": "availability" }}
                    checked={Boolean(filters.availability)}
                    onChange={(e) => handleFilterBoxes(e, "available")}
                  />
                }
                label={"Exclude out of stock"}
                labelPlacement="start"
                sx={{
                  justifyContent: "space-between",
                  ml: 0,
                }}
              />
            </FormGroup>
          </Box>
          <FlexBox csx={{ justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleApplyFilter}
              disabled={JSON.stringify(initFilters) === JSON.stringify(filters)}
            >
              Apply
            </Button>
          </FlexBox>
        </Grid>
        <Grid item md={9}>
          <FlexBox csx={{ justifyContent: "flex-end", mb: 2 }}>
            <div>
              <Button
                id="sort-btn"
                variant="outlined"
                onClick={handleSortBtn}
                endIcon={<ArrowDropDownIcon />}
              >
                Sort by
              </Button>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {sortMenuData.map((md) => (
                  <MenuItem
                    key={md.code}
                    data-sorttype={md.code}
                    onClick={handleSortMenuItems}
                  >
                    {md.name}
                    {sortType === md.code && <CheckIcon />}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </FlexBox>
          <Grid container columnSpacing={2} rowSpacing={4} sx={{ mb: "20px" }}>
            {(productsStatus === "idle" || productsStatus === "loading") && (
              <Typography>Loading...</Typography>
            )}
            {productsStatus === "succeeded" &&
              visibleProducts.map((product) => (
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
                        {formatValueLabel(product.unit_price)}
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
            <Typography>
              {(page - 1) * PRODUCT_ITEMS_PER_PAGE + 1}-
              {(page - 1) * PRODUCT_ITEMS_PER_PAGE +
                1 +
                visibleProducts.length -
                1}{" "}
              of {productsCount}
            </Typography>
            <IconButton disabled={page === 1} onClick={handleLftPgBtn}>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              disabled={
                page === Math.ceil(productsCount / PRODUCT_ITEMS_PER_PAGE)
              }
              onClick={handleRgtPgBtn}
            >
              <ChevronRightIcon />
            </IconButton>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
