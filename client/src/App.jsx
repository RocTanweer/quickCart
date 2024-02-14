import { Outlet } from "react-router-dom";

import { Header } from "./layouts";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
