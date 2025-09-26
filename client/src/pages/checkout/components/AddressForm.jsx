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
import {
  addressCreateAsync,
  addressUpdateAsync,
  updateAddress,
} from "../../../state/slices/addressSlice";
import { filterKeyValuePair } from "../../../utils/function";

const AddressForm = ({ addFormInitState, handleCurrAddEdit }) => {
  const dispatch = useDispatch();
  const userId = useSelector(userIdSelector);

  const formik = useFormik({
    initialValues: addFormInitState
      ? { ...addFormInitState }
      : {
          name: "",
          mobile: "",
          pin_code: "",
          address_line_1: "",
          address_line_2: "",
          landmark: "",
          city: "",
          state: "",
        },
    onSubmit: async (values) => {
      try {
        if (addFormInitState === undefined) {
          const data = { user_id: userId, ...values };

          await dispatch(addressCreateAsync(data)).unwrap();
        } else {
          const updates = filterKeyValuePair(values, addFormInitState);

          await dispatch(
            addressUpdateAsync({ addressId: addFormInitState.id, updates })
          ).unwrap();

          dispatch(updateAddress({ updates }));

          handleCurrAddEdit();
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: addressFormValSch,
    enableReinitialize: true,
  });

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
          name="pin_code"
          type="text"
          fullWidth
          autoComplete="off"
          value={formik.values.pin_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.pin_code && Boolean(formik.errors.pin_code)}
          helperText={formik.touched.pin_code && formik.errors.pin_code}
          inputProps={{ inputMode: "numeric", maxLength: 6 }}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
          }}
        />
      </FlexBox>

      <TextField
        label="House/Apartment/Colony/Street"
        name="address_line_1"
        fullWidth
        autoComplete="off"
        value={formik.values.address_line_1}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address_line_1 && Boolean(formik.errors.address_line_1)
        }
        helperText={
          formik.touched.address_line_1 && formik.errors.address_line_1
        }
      />

      <TextField
        label="Area/Sector/Lane"
        name="address_line_2"
        fullWidth
        autoComplete="off"
        value={formik.values.address_line_2}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address_line_2 && Boolean(formik.errors.address_line_2)
        }
        helperText={
          formik.touched.address_line_2 && formik.errors.address_line_2
        }
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

      <FlexBox csx={{ gap: 2 }}>
        {addFormInitState && (
          <Button
            fullWidth
            variant="contained"
            color={"error"}
            onClick={() => handleCurrAddEdit()}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={addFormInitState && !formik.dirty}
          fullWidth
        >
          Submit
        </Button>
      </FlexBox>
    </Stack>
  );
};

export default AddressForm;
