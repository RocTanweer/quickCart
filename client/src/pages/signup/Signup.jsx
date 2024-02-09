import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "js-cookie";

import {
  Typography,
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FlexBox } from "../../layouts";
import { emailValidator } from "../../lib/yupSchemas";
import { signup } from "../../state/slices/signupSlice";

export const Signup = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: emailValidator,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signup(values)).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const [showPassword, setShowPassword] = useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (Cookies.get("qcticket")) {
    return <Navigate to={"/"} replace={true} />;
  }

  return (
    <FlexBox csx={{ minHeight: "100vh" }}>
      <Stack gap={2} sx={{ maxWidth: "396px", width: "100%", height: "auto" }}>
        <Box>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h4"
            component={"h1"}
          >
            Sign up
          </Typography>
        </Box>

        <Stack component={"form"} spacing={2} onSubmit={formik.handleSubmit}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label={"Name"}
              type={"text"}
              name={"name"}
              id={"name"}
              fullWidth
              required
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              label={"Email"}
              type={"text"}
              name={"email"}
              id={"email"}
              fullWidth
              required
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email &&
                formik.touched.email &&
                "Email is invalid"
              }
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={formik.handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button fullWidth variant="contained" type="submit">
            {formik.isSubmitting ? (
              <>
                <CircularProgress color="grey" size={24.5} />
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Link href="/login" textAlign={"right"}>
            Already have an account? Log in
          </Link>
        </Stack>
      </Stack>
    </FlexBox>
  );
};

export default Signup;
