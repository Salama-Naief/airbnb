"use client";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import { boolean } from "zod";

interface CategoryBoxProps {
  label: string;
  selected: boolean;
  icon: IconType;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  selected,
  icon: Icon,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [params, router, label]);
  return (
    <div
      onClick={handleClick}
      className={`
    
      p-2
      border-b-2
      hover:text-neutral-800
      transtion-all
      flex
      flex-col
      items-center
      justify-center
      text-sm
      cursor-pointer
      ${
        selected
          ? "border-neutral-800 text-neutral-800"
          : "border-transparent   text-neutral-500"
      }
    `}
    >
      <Icon />
      {label}
    </div>
  );
};

export default CategoryBox;
