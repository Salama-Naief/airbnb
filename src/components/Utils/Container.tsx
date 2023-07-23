"use client";
import React from "react";

interface ContainerProps {
  childern: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ childern }) => {
  return (
    <div
      className="
  max-w-[2520px]
  mx-auto
  xl:px-20 
  md:px-10
  sm:px-2
  px-4
"
    >
      {childern}
    </div>
  );
};

export default Container;
