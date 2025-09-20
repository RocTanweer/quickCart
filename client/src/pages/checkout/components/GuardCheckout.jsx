import { useSelector } from "react-redux";
import {
  shoppingCartItemsListSelector,
  shoppingCartItemsListStatusSelector,
} from "../../../state/slices/shoppingCartItemsSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isLoggedIn } from "../../../utils/function";

const GuardCheckout = () => {
  const cartItemsList = useSelector(shoppingCartItemsListSelector);
  const cartItemsListStatus = useSelector(shoppingCartItemsListStatusSelector);
  const location = useLocation();

  if (!isLoggedIn()) {
    return (
      <Navigate
        to={"/login"}
        replace={true}
        state={{ prevPath: location.pathname }}
      />
    );
  }

  if (cartItemsListStatus === "loading") return;

  if (cartItemsListStatus === "succeeded" && cartItemsList.length === 0) {
    return <Navigate to={"/cart"} replace={true} />;
  } else {
    return <Outlet />;
  }
};

export default GuardCheckout;
