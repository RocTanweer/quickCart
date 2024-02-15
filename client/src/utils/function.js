import Cookies from "js-cookie";

export const isLoggedIn = () => {
  return Boolean(Cookies.get("qcticket"));
};
