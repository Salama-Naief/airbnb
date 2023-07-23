"use client";
import * as Yup from "yup";

const LoginSchema = () => {
  const schema = Yup.object().shape({
    // email is required with email format
    email: Yup.string()
      .required("email is required!")
      .min(3, "too short!")
      .email("invalid email formate!"),
    // password is required with minimum length of 8
    password: Yup.string()
      .required("password is required!")
      .min(8, "too short")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password must contain at least one capital letter,small letter,special char,number"
      ),
  });
  return schema;
};

export default LoginSchema;
