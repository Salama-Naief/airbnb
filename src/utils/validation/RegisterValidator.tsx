"use client";
import * as Yup from "yup";

const RegisterSchema = () => {
  const schema = Yup.object().shape({
    // email is required with email format
    email: Yup.string()
      .required("email is required!")
      .min(3, "too short!")
      .email("invalid email formate!"),
    username: Yup.string()
      .required("username is required!")
      .min(3, "too short"),
    // password is required with minimum length of 8
    password: Yup.string()
      .required("password is required!")
      .min(8, "too short")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "password must contain at least one capital letter,small letter,special char,number"
      ),
    confirmPassword: Yup.string()
      .required("confirm password is required!")
      .oneOf(
        [Yup.ref("password"), "null"],
        "password and confirm not matches!"
      ),
  });
  return schema;
};

export default RegisterSchema;
