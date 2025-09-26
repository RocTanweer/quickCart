import * as Yup from "yup";
import { states } from "../pages/checkout/constants/states";

export const emailValidator = Yup.object({
  email: Yup.string().email("Invalid email"),
});

export const newProductFormValSch = Yup.object({
  unitPrice: Yup.number().positive("Unit price cannot be 0"),
  image: Yup.string().required("Please choose an image"),
});

export const addressFormValSch = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(45, "Name cannot exceed 45 characters")
    .required("Receiver name is required"),

  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),

  pin_code: Yup.string()
    .matches(/^\d{6}$/, "PIN code must be exactly 6 digits")
    .required("PIN code is required"),

  address_line_1: Yup.string()
    .trim()
    .min(3, "Address is too short")
    .max(45, "Address is too long")
    .required("House is required"),

  address_line_2: Yup.string()
    .trim()
    .min(3, "Address is too short")
    .max(45, "Address is too long")
    .required("Area is required"),

  landmark: Yup.string().trim().required("Landmark is required"),

  city: Yup.string()
    .trim()
    .min(3, "City/Town must be at least 3 characters")
    .max(45, "City/Town cannot exceed 45 characters")
    .required("City/Town is required"),

  state: Yup.string()
    .oneOf(states, "Select a valid state")
    .required("State is required"),
});
