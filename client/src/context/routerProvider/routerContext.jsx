import { createBrowserRouter } from "react-router-dom";

import App from "../../App";

import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Home from "../../pages/home/Home.jsx";
import Products from "../../pages/products/Products.jsx";
import ProductDetails from "../../pages/productDetails/ProductDetails.jsx";
import PageNotFound from "../../pages/pageNotFound/PageNotFound.jsx";
import { GuardRoute } from "../../components";
import Profile from "../../pages/profile/Profile.jsx";
import Admin from "../../pages/admin/Admin.jsx";
import Cart from "../../pages/cart/Cart.jsx";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    element: <GuardRoute role={"USER"} />,
    children: [
      {
        path: "/profile/:name",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    element: <GuardRoute role={"ADMIN"} />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);
