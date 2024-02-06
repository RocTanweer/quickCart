import { createBrowserRouter } from "react-router-dom";

import App from "../../App";

import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Home from "../../pages/home/Home.jsx";
import Products from "../../pages/products/Products.jsx";
import ProductDetails from "../../pages/productDetails/ProductDetails.jsx";
import PageNotFound from "../../pages/pageNotFound/PageNotFound.jsx";

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
]);
