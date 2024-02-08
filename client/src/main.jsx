import React from "react";
import ReactDOM from "react-dom/client";

import GlobalContextProvider from "./context/GlobalContextProvider";

import CssBaseline from "@mui/material/CssBaseline";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <GlobalContextProvider />
  </React.StrictMode>
);
