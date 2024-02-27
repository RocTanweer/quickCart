import { useDispatch } from "react-redux";
import { useFormik } from "formik";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  TextField,
  Typography,
  Input,
  FormHelperText,
} from "@mui/material";

import {
  productCategoriesCreateAsync,
  incrementProductCategoriesCount,
  productCategoriesUpdateAsync,
  updateProductCategory,
} from "../../../../state/slices/productCategoriesSlice";

import { FlexBox } from "../../../../layouts";
import { filterKeyValuePair } from "../../../../utils/function";

const ModalFormProductCategory = ({
  openDialog,
  handleCloseDialog,
  formIntState,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: formIntState ? formIntState.name : "",
      thumbnail: formIntState ? formIntState.thumbnail : "",
    },
    onSubmit: async (values) => {
      try {
        if (!formIntState) {
          if (values.thumbnail === "") {
            formik.setFieldError("thumbnail", "Please choose an image");
            return;
          }
          const data = {
            name: values.name,
            thumbnail: "https://google.com",
          };
          await dispatch(productCategoriesCreateAsync(data)).unwrap();
          dispatch(incrementProductCategoriesCount());
        } else {
          const updateDetails = {
            id: formIntState.id,
            data: filterKeyValuePair(values, formIntState),
          };
          await dispatch(productCategoriesUpdateAsync(updateDetails)).unwrap();
          dispatch(updateProductCategory(updateDetails));
        }
        handleResetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("thumbnail", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetForm = () => {
    formik.resetForm();
    handleCloseDialog();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleResetForm}
      PaperProps={{ component: "div" }}
    >
      <DialogTitle>{!formIntState ? "Add New" : "Update"} Category</DialogTitle>

      <DialogContent sx={{ minWidth: "400px" }}>
        <Stack
          component={"form"}
          gap={1}
          sx={{ paddingY: "5px" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Category Name"
            name={"name"}
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
          <FlexBox
            csx={{
              flexDirection: "column",
              width: "100%",
              height: "200px",
              border: "1px solid",
              borderRadius: "11px",
              padding: "11px",
              backgroundImage: `url("${formik.values.thumbnail}")`,
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
                id="image-input"
                name={"thumbnail"}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, formik.setFieldValue)}
                sx={{ display: "none" }}
              />
              <label htmlFor="image-input">
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
                error={formik.errors.thumbnail && formik.touched.thumbnail}
              >
                {formik.errors.thumbnail &&
                  formik.touched.thumbnail &&
                  formik.errors.thumbnail}
              </FormHelperText>
            </>
          </FlexBox>
          <DialogActions>
            <Button variant="outlined" onClick={handleResetForm}>
              cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formIntState && !formik.dirty}
            >
              submit
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormProductCategory;
