import { useFormik } from "formik";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import { FlexBox } from "../../../layouts";

import { states } from "../constants/states";
import { addressFormValSch } from "../../../lib/yupSchemas";
import { useDispatch, useSelector } from "react-redux";
import { userIdSelector } from "../../../state/slices/loginSlice";
import { addressCreateAsync } from "../../../state/slices/addressSlice";

const AddressForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
    },
    onSubmit: async (values) => {
      try {
        const data = { userId, ...values };

        await dispatch(addressCreateAsync(data)).unwrap();

        handleResetForm();
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: addressFormValSch,
    enableReinitialize: true,
  });

  const handleResetForm = () => {
    formik.resetForm();
  };

  return (
    <Stack component="form" spacing={2} onSubmit={formik.handleSubmit}>
      <Box>
        <TextField
          label="Receiver Name"
          name="name"
          fullWidth
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Box>

      <FlexBox csx={{ gap: 2 }}>
        <TextField
          label="Mobile"
          name="mobile"
          type="text"
          fullWidth
          autoComplete="off"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          inputProps={{ inputMode: "numeric", maxLength: 10 }}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
          }}
        />

        <TextField
          label="PIN code"
          name="pinCode"
          type="text"
          fullWidth
          autoComplete="off"
          value={formik.values.pinCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
          helperText={formik.touched.pinCode && formik.errors.pinCode}
          inputProps={{ inputMode: "numeric", maxLength: 6 }}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
          }}
        />
      </FlexBox>

      <TextField
        label="House/Apartment/Colony/Street"
        name="addressLine1"
        fullWidth
        autoComplete="off"
        value={formik.values.addressLine1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)
        }
        helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
      />

      <TextField
        label="Area/Sector/Lane"
        name="addressLine2"
        fullWidth
        autoComplete="off"
        value={formik.values.addressLine2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)
        }
        helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
      />

      <FormControl
        fullWidth
        error={formik.touched.landmark && Boolean(formik.errors.landmark)}
      >
        <InputLabel id="landmark-label">Landmark</InputLabel>
        <Select
          labelId="landmark-label"
          label="landmard"
          name="landmark"
          value={formik.values.landmark}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {states.map((state, i) => (
            <MenuItem value={state} key={i}>
              {state}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.landmark && formik.errors.landmark}
        </FormHelperText>
      </FormControl>

      <FlexBox csx={{ gap: 2 }}>
        <TextField
          label="City/Town"
          name="city"
          fullWidth
          autoComplete="off"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <FormControl
          fullWidth
          error={formik.touched.state && Boolean(formik.errors.state)}
        >
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            label="state"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {states.map((state, i) => (
              <MenuItem value={state} key={i}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.state && formik.errors.state}
          </FormHelperText>
        </FormControl>
      </FlexBox>

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default AddressForm;
