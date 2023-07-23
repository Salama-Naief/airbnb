"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  description: string;
  icon: IconType;
}
const CategoryItem: React.FC<CategoryItemProps> = ({
  description,
  icon: Icon,
  label,
}) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <Icon size={40} className="text-neutral-700" />
      <div className="">
        <div className="text-neutral-700">{label}</div>
        <div className="font-light text-neutral-400">{description}</div>
      </div>
    </div>
  );
};

export default CategoryItem;
