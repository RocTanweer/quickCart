import { Outlet } from "react-router-dom";

import { Header } from "./layouts";
import Footer from "./layouts/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
