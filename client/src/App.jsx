import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Header } from "./layouts";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default App;
