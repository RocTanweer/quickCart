import { object, string, number } from "yup";

export const emailValidator = object({
  email: string().email("Invalid email"),
});

export const newProductFormValSch = object({
  unitPrice: number().positive("Unit price cannot be 0"),
  image: string().required("Please choose an image"),
});
