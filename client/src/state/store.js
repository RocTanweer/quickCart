import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./slices/signupSlice";
import loginReducer from "./slices/loginSlice";
import logoutReducer from "./slices/logoutSlice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    logout: logoutReducer,
  },
});
