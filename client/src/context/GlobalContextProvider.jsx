import { Provider } from "react-redux";

import MyRouterProvider from "./routerProvider/MyRouterProvider";
import MyThemeProvider from "./themeProvider/MyThemeProvider";
import store from "../state/store";

const GlobalContextProvider = () => {
  return (
    <Provider store={store}>
      <MyThemeProvider>
        <MyRouterProvider />
      </MyThemeProvider>
    </Provider>
  );
};

export default GlobalContextProvider;
