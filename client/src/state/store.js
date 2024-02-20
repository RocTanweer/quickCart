import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./slices/signupSlice";
import loginReducer from "./slices/loginSlice";
import logoutReducer from "./slices/logoutSlice";
import usersReducer from "./slices/usersSlice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    logout: logoutReducer,
    users: usersReducer,
  },
});
