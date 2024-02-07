import { object, string } from "yup";

export const emailValidator = object({
  email: string().email(),
});
