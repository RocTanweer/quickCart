import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { shoppingCartItemsListAsync } from "../state/slices/shoppingCartItemsSlice";

import MyRouterProvider from "./routerProvider/MyRouterProvider";
import MyThemeProvider from "./themeProvider/MyThemeProvider";
import store from "../state/store";
import { useRef } from "react";

const CartInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const didFetch = useRef(false);

  const shoppingCartId = localStorage.getItem("QCSCId");

  useEffect(() => {
    if (didFetch.current) return;

    didFetch.current = true;

    const fetchShoppingCartItems = async () => {
      try {
        await dispatch(shoppingCartItemsListAsync({ shoppingCartId })).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    fetchShoppingCartItems();
  }, [dispatch, shoppingCartId]);

  return children;
};

const GlobalContextProvider = () => {
  return (
    <Provider store={store}>
      <MyThemeProvider>
        <CartInitializer>
          <MyRouterProvider />
        </CartInitializer>
      </MyThemeProvider>
    </Provider>
  );
};

export default GlobalContextProvider;
