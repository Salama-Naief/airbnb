"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/utils/consts/categories.const";

import React from "react";
import CategoryBox from "../Utils/CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const path = usePathname();
  if (path !== "/") {
    return;
  }
  return (
    <div
      className="
      container
      mx-auto
      py-3
        flex 
        justify-between
        overflow-y-hidden
        overflow-x-auto
         "
    >
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category === item.label}
        />
      ))}
    </div>
  );
};

export default Categories;
