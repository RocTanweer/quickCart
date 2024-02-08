import { Provider } from "react-redux";

import MyRouterProvider from "./routerProvider/MyRouterProvider";
import store from "../state/store";

const GlobalContextProvider = () => {
  return (
    <Provider store={store}>
      <MyRouterProvider />
    </Provider>
  );
};

export default GlobalContextProvider;
