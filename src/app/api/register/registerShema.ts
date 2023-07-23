import { z } from "zod";
export const registerShema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "username is required!" })
      .min(3, { message: "username is too short!" }),
    email: z
      .string()
      .nonempty({ message: "email is required!" })
      .email({ message: "invalid email formate!" }),
    password: z
      .string()
      .nonempty({ message: "password is required!" })
      .min(8, { message: "password is too short" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "confirm password is required!" })
      .min(8, { message: "confirm password is too short" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
