import { configureStore } from "@reduxjs/toolkit";

import signupReducer from "./slices/signupSlice";
import loginReducer from "./slices/loginSlice";
import logoutReducer from "./slices/logoutSlice";
import usersReducer from "./slices/usersSlice";
import productCategoriesReducer from "./slices/productCategoriesSlice";
import productBrandsReducer from "./slices/productBrandsSlice";
import productsReducer from "./slices/productsSlice";

export default configureStore({
  reducer: {
    signup: signupReducer,
    login: loginReducer,
    logout: logoutReducer,
    users: usersReducer,
    productCategories: productCategoriesReducer,
    productBrands: productBrandsReducer,
    products: productsReducer,
  },
});
