"use client";
import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser, currentUser } from "@/types";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: currentUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <nav className="sticky top-0 w-full shadow-sm z-20 bg-white ">
      <div className="border-b-[1px] ">
        <div className="container mx-auto px-4 md::px-0 py-3">
          <div className="flex flex-row items-center space-x-4 md:space-x-0 justify-between">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
        <hr />
        <Categories />
      </div>
    </nav>
  );
};

export default Navbar;
