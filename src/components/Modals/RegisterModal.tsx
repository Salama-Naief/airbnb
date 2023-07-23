"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import { useFormik } from "formik";
import { AiFillGithub } from "react-icons/ai";
//import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import { onClose } from "@/redux/hooks/useRegisterSlice";
import Input from "../inputs/Input";
import Heading from "../Utils/Heading";
import Button from "../Utils/Button";
import useRegisterFormik from "@/formik/useResgisterFormik";
import { signIn } from "next-auth/react";
import { onOpen } from "@/redux/hooks/useLoginSlice";

const RegisterModal = () => {
  const useRegister = useAppSelector((state) => state.useRegister);
  const dispatch = useAppDispatch();
  const { errors, isLoading, values, handleChange, handleSubmit } =
    useRegisterFormik();
  //handle close function set isOpen to false
  const handleClose = () => {
    dispatch(onClose());
  };

  const handleLogin = () => {
    dispatch(onOpen());
    dispatch(onClose());
  };

  const bodyContent = (
    <>
      <div className="">
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={false}
          id="username"
          name="username"
          value={values.username}
          handleChange={handleChange}
          label="Username"
          type="text"
          error={errors.username}
        />
        <Input
          disabled={false}
          id="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          label="Email"
          type="text"
          error={errors.email}
        />
        <Input
          disabled={false}
          id="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          label="Password"
          type="password"
          error={errors.password}
        />
        <Input
          disabled={false}
          id="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          handleChange={handleChange}
          label="confirmPassword"
          type="password"
          error={errors.confirmPassword}
        />
      </form>
    </>
  );

  const footerContent = (
    <div className=" flex flex-col space-y-4">
      <Button
        label="Continue with Google"
        onClick={() => signIn("google")}
        icon={FcGoogle}
        outline
      />
      <Button
        label="Continue with Github"
        onClick={() => signIn("github")}
        icon={AiFillGithub}
        outline
      />
      <div className="flex justify-center">
        Already have an account?
        <span
          onClick={() => handleLogin()}
          className="mx-2 cursor-pointer hover:underline text-rose-500"
        >
          login
        </span>
      </div>
    </div>
  );
  return (
    <div
      className={`${
        useRegister.isOpen ? "opacity-100 block" : "opacity-0 hidden"
      } transtion-all duration-300`}
    >
      <Modal
        actionLabel="Continue"
        isOpen={useRegister.isOpen}
        onClose={handleClose}
        title="Register"
        onSubmit={handleSubmit}
        disabled={isLoading}
        isLoading={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
