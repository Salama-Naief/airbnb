"use client";

import React, { MouseEventHandler } from "react";

interface MenuItemsProps {
  onClick: () => void;
  label: string;
  setOpen: (type: boolean) => void;
}
const MenuItems: React.FC<MenuItemsProps> = ({ label, onClick, setOpen }) => {
  const handleClick = () => {
    onClick();
    setOpen(false);
  };
  return (
    <div
      onClick={handleClick}
      className="
              py-3 
              px-4
              font-medium
            text-gray-900 
            hover:bg-neutral-100 
              transition-all
              rounded"
    >
      {label}
    </div>
  );
};

export default MenuItems;
