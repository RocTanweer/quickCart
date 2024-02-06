import React from "react";
import ReactDOM from "react-dom/client";

import MyRouterProvider from "./context/routerProvider/MyRouterProvider";

import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <MyRouterProvider />
  </React.StrictMode>
);
