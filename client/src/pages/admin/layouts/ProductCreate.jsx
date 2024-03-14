import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Input,
  Box,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  Button,
  FormHelperText,
} from "@mui/material";

import { FlexBox } from "../../../layouts";
import { newProductFormValSch } from "../../../lib/yupSchemas";
import {
  productCategoriesNamesAsync,
  productCategoriesNamesSelector,
} from "../../../state/slices/productCategoriesSlice";
import {
  productBrandsNamesSelector,
  productBrandsNamesAsync,
} from "../../../state/slices/productBrandsSlice";
import { productsCreateAsync } from "../../../state/slices/productsSlice";

const ProductCreate = () => {
  const dispatch = useDispatch();
  const brandNames = useSelector(productBrandsNamesSelector);
  const categoryNames = useSelector(productCategoriesNamesSelector);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchBrandsNames = async () => {
      try {
        if (isMounted.current) {
          await dispatch(productBrandsNamesAsync()).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCategoriesNames = async () => {
      try {
        if (isMounted.current) {
          await dispatch(productCategoriesNamesAsync()).unwrap();
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (brandNames.length === 0) {
      fetchBrandsNames();
    }

    if (categoryNames.length === 0) {
      fetchCategoriesNames();
    }
  }, [dispatch, brandNames, categoryNames]);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      productCategoryId: "",
      productBrandId: "",
      stockQuantity: 0,
      unitPrice: 1,
      image: "",
    },
    onSubmit: async (values) => {
      try {
        const data = { ...values, image: "https://google.com" };
        await dispatch(productsCreateAsync(data)).unwrap();

        handleResetForm();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: newProductFormValSch,
    enableReinitialize: true,
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetForm = () => {
    formik.resetForm();
  };

  return (
    <Box sx={{ maxWidth: "500px", width: "100%", mt: "40px" }}>
      <Typography variant="h4" textAlign="left" component="h2" mb="25px">
        Create New Product
      </Typography>

      <Stack component="form" spacing={2} onSubmit={formik.handleSubmit}>
        <Box>
          <TextField
            label="Name"
            type="text"
            name="name"
            fullWidth
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name && formik.touched.name}
            helperText={
              formik.errors.name && formik.touched.name && formik.errors.name
            }
          />
        </Box>
        <Box>
          <TextField
            label="Description"
            type="text"
            name="description"
            fullWidth
            required
            multiline
            rows={5}
            inputProps={{ maxLength: 500 }}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.errors.description && formik.touched.description}
            helperText={
              formik.errors.description &&
              formik.touched.description &&
              formik.errors.description
            }
          />
        </Box>
        <FlexBox csx={{ gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              name="productCategoryId"
              options={categoryNames}
              getOptionLabel={(option) => option.name}
              disablePortal
              onChange={(e, value) => {
                formik.setFieldValue(
                  "productCategoryId",
                  value ? value.id : ""
                );
              }}
              renderInput={(params) => (
                <TextField {...params} label="Product Category" required />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Autocomplete
              name="productBrandId"
              options={brandNames}
              getOptionLabel={(option) => option.name}
              disablePortal
              onChange={(e, value) => {
                formik.setFieldValue("productBrandId", value ? value.id : "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Product Brand" required />
              )}
            />
          </Box>
        </FlexBox>
        <FlexBox csx={{ gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Stock Quantity"
              type="number"
              name="stockQuantity"
              inputProps={{ min: 0 }}
              sx={{ width: "100%" }}
              value={formik.values.stockQuantity}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Unit Price"
              type="number"
              name="unitPrice"
              sx={{ width: "100%" }}
              value={formik.values.unitPrice}
              onChange={formik.handleChange}
              error={formik.errors.unitPrice && formik.touched.unitPrice}
              helperText={
                formik.errors.unitPrice &&
                formik.touched.unitPrice &&
                formik.errors.unitPrice
              }
            />
          </Box>
        </FlexBox>

        <FlexBox
          csx={{
            border: 1,
            borderStyle: "dashed",
            borderRadius: 2,
            borderColor: "divider",
          }}
        >
          <FlexBox
            csx={{
              flexDirection: "column",
              width: "200px",
              height: "200px",
              backgroundImage: `url("${formik.values.image}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backgroundBlendMode: "overlay",
            }}
          >
            <>
              <Typography variant="body2" color="textSecondary">
                Upload Image
              </Typography>
              <Input
                id="image"
                name={"image"}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, formik.setFieldValue)}
                sx={{ display: "none" }}
              />
              <label htmlFor="image">
                <Typography
                  variant="button"
                  sx={{ cursor: "pointer" }}
                  color="primary"
                  component="span"
                >
                  Choose File
                </Typography>
              </label>
              <FormHelperText
                error={formik.errors.image && formik.touched.image}
              >
                {formik.errors.image &&
                  formik.touched.image &&
                  formik.errors.image}
              </FormHelperText>
            </>
          </FlexBox>
        </FlexBox>
        <FlexBox csx={{ justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </FlexBox>
      </Stack>
    </Box>
  );
};

export default ProductCreate;
