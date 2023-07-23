"use client";
import Image from "next/image";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
import { avatar } from "../../../public/images";
import MenuItems from "./MenuItems";
import { SafeUser, currentUser } from "@/types";
import { useDispatch } from "react-redux";
import { onOpen as registerOpen } from "@/redux/hooks/useRegisterSlice";
import { onOpen as logingOpen } from "@/redux/hooks/useLoginSlice";
import { onOpen } from "@/redux/hooks/useRentSlice";
import Avatar from "../Utils/Avatar";

interface UserMenuProps {
  currentUser?: currentUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center space-x-3">
      <button
        onClick={() => dispatch(onOpen())}
        className="rounded-full
        cursor-pointer 
        text-sm 
        hidden
        lg:block 
        relative 
        px-3 
        py-1.5 
        shadow-sm 
        hover:shadow-md 
        transition-all"
      >
        Airbnb your home
      </button>
      <div
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-full  
        cursor-pointer 
        h-fit 
        border 
        relative 
        px-3 py-1.5 
        shadow-sm 
        hover:shadow-md 
        transition-all
        "
      >
        <div
          className="flex flex-row items-center
       space-x-2 text-sm cursor-pointer"
        >
          <AiOutlineMenu size={18} />
          <Avatar src={currentUser?.image} />
        </div>
        {menuOpen && (
          <div
            className="
          shadow-md 
         rounded-lg
         py-2 
         bg-white
          absolute
          top-14
          right-0
          w-64 z-30
             "
          >
            {currentUser ? (
              <>
                <MenuItems
                  label="My trips"
                  onClick={() => router.push("/trips")}
                  setOpen={setMenuOpen}
                />
                <MenuItems
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                  setOpen={setMenuOpen}
                />
                <MenuItems
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                  setOpen={setMenuOpen}
                />
                <MenuItems
                  label="My properties"
                  onClick={() => router.push("/properties")}
                  setOpen={setMenuOpen}
                />
                <MenuItems
                  label="Airbnb your home"
                  onClick={() => dispatch(onOpen())}
                  setOpen={setMenuOpen}
                />
                <hr />
                <MenuItems
                  label="Logout"
                  onClick={() => signOut()}
                  setOpen={setMenuOpen}
                />
              </>
            ) : (
              <>
                <MenuItems
                  label="Sign in"
                  onClick={() => dispatch(registerOpen())}
                  setOpen={setMenuOpen}
                />
                <MenuItems
                  label="Login"
                  onClick={() => dispatch(logingOpen())}
                  setOpen={setMenuOpen}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
