import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
import {
  signupAsync,
  signupStatusSelector,
} from "../../state/slices/signupSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupStatus = useSelector(signupStatusSelector);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: emailValidator,
    onSubmit: async (values) => {
      try {
        await dispatch(signupAsync(values)).unwrap();
        navigate("/login", { replace: true });
      } catch (error) {
        const { field, value } = error;
        formik.setFieldError(field, value);
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
      <Stack gap={2} sx={{ maxWidth: "450px", width: "100%", height: "auto" }}>
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
              autoComplete="off"
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
              autoComplete="off"
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
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
            {signupStatus === "loading" ? (
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
