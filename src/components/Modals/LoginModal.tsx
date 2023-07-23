"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";
import { onClose } from "@/redux/hooks/useLoginSlice";
import Input from "../inputs/Input";
import Heading from "../Utils/Heading";
import Button from "../Utils/Button";
import useLoginFormik from "@/formik/useLoginFormik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { onOpen } from "@/redux/hooks/useRegisterSlice";

const LoginModal = () => {
  const useLogin = useAppSelector((state) => state.useLogin);
  const dispatch = useAppDispatch();
  const { errors, isLoading, values, handleChange, handleSubmit } =
    useLoginFormik();
  //handle close function set isOpen to false
  const handleClose = () => {
    dispatch(onClose());
  };

  const handleRegister = () => {
    dispatch(onOpen());
    dispatch(onClose());
  };
  const bodyContent = (
    <>
      <div className="">
        <Heading title="Welcome back" subtitle="Login with your account" />
      </div>
      <form onSubmit={handleSubmit}>
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
        Not have an account?
        <span
          onClick={() => handleRegister()}
          className="mx-2 cursor-pointer hover:underline text-rose-500"
        >
          signup
        </span>
      </div>
    </div>
  );
  return (
    <div
      className={`${
        useLogin.isOpen ? "opacity-100 block" : "opacity-0 hidden"
      } transtion-all duration-300`}
    >
      <Modal
        actionLabel="Continue"
        isOpen={useLogin.isOpen}
        onClose={handleClose}
        title="Login"
        isLoading={isLoading}
        onSubmit={handleSubmit}
        disabled={isLoading}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;
