import Cookies from "js-cookie";

export const isLoggedIn = () => {
  return Boolean(Cookies.get("qcticket"));
};
export const filterKeyValuePair = (obj1, obj2) => {
  const filteredObj = Object.entries(obj1).filter(([key1, value1]) => {
    return obj2[key1] !== value1;
  });
  const newObj = Object.fromEntries(filteredObj);
  return newObj;
};

export const formatValueLabel = (value) => {
  // Format the value with currency symbol
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(value);
};
