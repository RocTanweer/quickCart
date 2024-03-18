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
  CircularProgress,
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
import {
  productCreateStatusSelector,
  productUpdateStatusSelector,
  productsCreateAsync,
  productsUpdateAsync,
  updateProduct,
} from "../../../state/slices/productsSlice";
import { filterKeyValuePair } from "../../../utils/function";

const ProductForm = ({ formIntState, handleDrawerClose }) => {
  const dispatch = useDispatch();
  const brandNames = useSelector(productBrandsNamesSelector);
  const categoryNames = useSelector(productCategoriesNamesSelector);
  const productCreateStatus = useSelector(productCreateStatusSelector);
  const productUpdateStatus = useSelector(productUpdateStatusSelector);

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
    initialValues: formIntState
      ? formIntState
      : {
          name: "",
          description: "",
          category_id: -1,
          brand_id: -1,
          stock_quantity: 0,
          unit_price: 1,
          image: "",
        },
    onSubmit: async (values) => {
      try {
        if (!formIntState) {
          const data = { ...values, image: "https://google.com" };
          await dispatch(productsCreateAsync(data)).unwrap();
          handleResetForm();
        } else {
          const updateDetails = {
            id: formIntState.id,
            data: filterKeyValuePair(values, formIntState),
          };
          await dispatch(productsUpdateAsync(updateDetails)).unwrap();

          if (updateDetails.data.category_id) {
            updateDetails.data.category_name = categoryNames.find(
              (cn) => cn.id === updateDetails.data.category_id
            ).name;
          }

          if (updateDetails.data.brand_id) {
            updateDetails.data.brand_name = brandNames.find(
              (bn) => bn.id === updateDetails.data.brand_id
            ).name;
          }
          dispatch(updateProduct(updateDetails));
          handleDrawerClose();
        }
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
            name="category_id"
            options={categoryNames}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={
              categoryNames.find((cn) => cn.id === formik.values.category_id) ||
              null
            }
            onChange={(e, value) => {
              formik.setFieldValue("category_id", value ? value.id : null);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Product Category" required />
            )}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Autocomplete
            name="brand_id"
            options={brandNames}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            value={
              brandNames.find((bn) => bn.id === formik.values.brand_id) || null
            }
            onChange={(e, value) => {
              formik.setFieldValue("brand_id", value ? value.id : null);
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
            name="stock_quantity"
            inputProps={{ min: 0 }}
            sx={{ width: "100%" }}
            value={formik.values.stock_quantity}
            onChange={formik.handleChange}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            label="Unit Price"
            type="number"
            name="unit_price"
            sx={{ width: "100%" }}
            value={formik.values.unit_price}
            onChange={formik.handleChange}
            error={formik.errors.unit_price && formik.touched.unit_price}
            helperText={
              formik.errors.unit_price &&
              formik.touched.unit_price &&
              formik.errors.unit_price
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
            <FormHelperText error={formik.errors.image && formik.touched.image}>
              {formik.errors.image &&
                formik.touched.image &&
                formik.errors.image}
            </FormHelperText>
          </>
        </FlexBox>
      </FlexBox>
      <FlexBox csx={{ justifyContent: "flex-end", gap: 2 }}>
        {formIntState && (
          <Button variant="outlined" onClick={handleDrawerClose}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={formIntState && !formik.dirty}
        >
          {productCreateStatus === "loading" ||
          productUpdateStatus === "loading" ? (
            <>
              <CircularProgress color="grey" size={24.5} />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </FlexBox>
    </Stack>
  );
};

export default ProductForm;
