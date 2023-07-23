"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryIngputProps {
  icon: IconType;
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
}

const CategoryIngput: React.FC<CategoryIngputProps> = ({
  icon: Icon,
  label,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
     w-full
     py-2
     px-6
     border
     transition-all
     hover:text-neutral-800
     flex
     flex-col
     gap-1
     rounded-xl
     cursor-pointer
     text-sm
     ${
       selected
         ? "text-neutral-800 border-neutral-800"
         : "text-neutral-400 border-neutral-400"
     }
    `}
    >
      <Icon size={30} />
      {label}
    </div>
  );
};

export default CategoryIngput;
