import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import {
  Typography,
  Box,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";

import { useFormik } from "formik";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { emailValidator } from "../../lib/yupSchemas";
import { FlexBox } from "../../layouts";
import {
  loginAsync,
  loginStatusSelector,
  setUserLoginInfo,
  userRoleSelector,
} from "../../state/slices/loginSlice";
import { isLoggedIn } from "../../utils/function";

const adminAccessiblePaths = ["/admin"];

export const Login = () => {
  const dispatch = useDispatch();
  const userRole = useSelector(userRoleSelector);
  const loginStatus = useSelector(loginStatusSelector);
  const { state: locState } = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: emailValidator,
    onSubmit: async (values) => {
      try {
        await dispatch(loginAsync(values)).unwrap();
        const userLoginInfo = jwtDecode(
          JSON.parse(Cookies.get("qcticket")).token
        );
        dispatch(setUserLoginInfo(userLoginInfo));
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

  if (isLoggedIn()) {
    const prevPath = locState?.prevPath;

    const isAdminRedirect =
      prevPath !== undefined &&
      adminAccessiblePaths.includes(prevPath) &&
      userRole === "ADMIN";

    const isAuthRedirect =
      prevPath !== undefined &&
      !adminAccessiblePaths.includes(prevPath) &&
      (userRole === "ADMIN" || userRole === "USER");

    const navigateJsx =
      isAdminRedirect || isAuthRedirect ? (
        <Navigate to={prevPath} replace={true} />
      ) : (
        <Navigate to={"/"} replace={true} />
      );
    return <>{navigateJsx}</>;
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
            Login
          </Typography>
        </Box>

        <Stack component={"form"} spacing={2} onSubmit={formik.handleSubmit}>
          <Box sx={{ flex: 1 }}>
            <TextField
              label={"Email"}
              type={"text"}
              name={"email"}
              id={"email"}
              fullWidth
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
              required
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              id="password"
              label="Password"
              required
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={formik.handleChange}
              error={formik.errors.password && formik.touched.password}
              helperText={
                formik.errors.password &&
                formik.touched.password &&
                formik.errors.password
              }
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
            {loginStatus === "loading" ? (
              <>
                <CircularProgress color="grey" size={24.5} />
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Link href="/signup" textAlign={"right"}>
            Do not have an account? Register
          </Link>
        </Stack>
      </Stack>
    </FlexBox>
  );
};

export default Login;
