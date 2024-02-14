import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";

import { userRoleSelector } from "../state/slices/loginSlice";

import { Header } from "../layouts";

const GuardRoute = ({ role }) => {
  const userRole = useSelector(userRoleSelector);
  const location = useLocation();

  let isAuthorize = false;
  if (role === "ADMIN") {
    isAuthorize = userRole === "ADMIN";
  } else if (role === "USER") {
    isAuthorize = userRole === "USER" || userRole === "ADMIN";
  }
  return (
    <>
      <Header />
      {isAuthorize ? (
        <Outlet />
      ) : (
        <Navigate
          to={"/login"}
          replace={true}
          state={{ prevPath: location.pathname }}
        />
      )}
    </>
  );
};

export default GuardRoute;
