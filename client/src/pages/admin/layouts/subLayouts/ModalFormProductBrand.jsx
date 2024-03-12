import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";

import {
  productBrandsCreateAsync,
  productBrandsUpdateAsync,
  incrementproductBrandsCount,
  updateProductBrand,
  productBrandsUpdateStatusSelector,
} from "../../../../state/slices/productBrandsSlice";

import { filterKeyValuePair } from "../../../../utils/function";

const ModalFormProductBrand = ({
  openDialog,
  handleCloseDialog,
  formIntState,
}) => {
  const dispatch = useDispatch();
  const productBrandsUpdateStatus = useSelector(
    productBrandsUpdateStatusSelector
  );

  const formik = useFormik({
    initialValues: {
      name: formIntState ? formIntState.name : "",
    },
    onSubmit: async (values) => {
      try {
        if (!formIntState) {
          const data = {
            name: values.name,
          };
          await dispatch(productBrandsCreateAsync(data)).unwrap();
          dispatch(incrementproductBrandsCount());
        } else {
          const updateDetails = {
            id: formIntState.id,
            data: filterKeyValuePair(values, formIntState),
          };
          await dispatch(productBrandsUpdateAsync(updateDetails)).unwrap();
          dispatch(updateProductBrand(updateDetails));
        }
        handleResetForm();
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitialize: true,
  });

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
      <DialogTitle>{!formIntState ? "Add New" : "Update"} Brand</DialogTitle>

      <DialogContent sx={{ minWidth: "400px" }}>
        <Stack
          component={"form"}
          gap={1}
          sx={{ paddingY: "5px" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            label="Brand Name"
            name={"name"}
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />

          <DialogActions>
            <Button variant="outlined" onClick={handleResetForm}>
              cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formIntState && !formik.dirty}
            >
              {productBrandsUpdateStatus === "loading" ? (
                <CircularProgress color="grey" size={24.5} />
              ) : (
                "submit"
              )}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormProductBrand;
