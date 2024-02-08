import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./slices/signupSlice";
import loginReducer from "./slices/loginSlice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
  },
});
