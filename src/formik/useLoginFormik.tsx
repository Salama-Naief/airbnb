"use client";

"use client";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoginSchema from "@/utils/validation/LoginValidator";
import { useFormik } from "formik";
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onClose } from "@/redux/hooks/useLoginSlice";

const useRegisterFormik = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema(),
    onSubmit: async (values) => {
      setIsLoading(true);
      signIn("credentials", { ...values, redirect: false }).then((callback) => {
        if (callback?.ok) {
          setIsLoading(false);
          toast.success("login success");
          dispatch(onClose());
          router.refresh();
        }
        if (callback?.error) {
          setIsLoading(false);
          toast.success(callback.error);
        }
      });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return { errors, isLoading, values, handleChange, handleSubmit };
};

export default useRegisterFormik;
