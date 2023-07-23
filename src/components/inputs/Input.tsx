"use client";

import React, { ChangeEvent, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps {
  id: string;
  name: string;
  label: string;
  handleChange: (e: ChangeEvent<any>) => void;
  type: string;
  disabled: boolean;
  error?: string | undefined;
  formatPrice?: boolean;
  value: string | number;
}
const Input: React.FC<InputProps> = ({
  id,
  name,
  error,
  handleChange,
  label,
  type = "text",
  disabled,
  formatPrice,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full mt-6">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input
        disabled={disabled}
        type={showPassword ? "text" : type}
        name={name}
        id={id}
        value={value}
        placeholder=" "
        onChange={handleChange}
        className={`
        peer
        w-full
        p-4
        pt-6 
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${
          error
            ? "border-rose-500 focus:border-rose-500 text-rose-500"
            : "border-neutral-300 focus:border-black"
        }
      `}
      />
      {(id === "password" || id === "confirmPassword") && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className={`
          ${error && "text-rose-500"}
               right-3 absolute top-5 cursor-pointer`}
        >
          {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
        </div>
      )}
      <label
        htmlFor={id}
        className={`
        absolute 
        text-md
        duration-150 
        transform 
        -translate-y-4 
        top-6
        z-10 
        origin-[0] 
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${error ? "text-rose-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
      {error && <p className="text-rose-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
