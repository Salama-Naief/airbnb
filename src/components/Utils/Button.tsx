import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconType, icons } from "react-icons/lib";
import {} from "react-loading";
import Loading from "./Loading";
interface ButtonProps {
  outline?: boolean;
  small?: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: IconType;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  onClick,
  small,
  outline,
  type = "submit",
  icon: Icon,
  isLoading,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
      rounded-lg
      active:scale-[0.98]
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      hover:opacity-80
      transtion-all
      duration-200
      text-center
      border
      capitalize
      w-full
      h-fit
      flex
      gap-4
      items-center
      px-6
      ${
        outline
          ? "border-black text-black bg-white hover:border-neutral-500"
          : "bg-rose-500 border-rose-500 text-white"
      }
      ${small ? "py-2 text-base" : "py-3 text-lg"}
    `}
    >
      {Icon && <Icon size={18} />}

      <div className="flex-1 text-center">
        {isLoading ? (
          small ? (
            <Loading type="spin" width={24} hieght={24} color="white" />
          ) : (
            <Loading type="spin" color="white" />
          )
        ) : (
          label
        )}
      </div>
    </button>
  );
};

export default Button;
