"use client";

import useFavorite from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Loading from "./Loading";

interface HeartButtonProps {
  listingId: string;
  currentUser: User | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const { hasFavorite, toggleFavorite, isLoading } = useFavorite({
    currentUser,
    listingId,
  });

  return (
    <button
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition-all"
    >
      <AiOutlineHeart
        size={28}
        className="absolute fill-white text-white -top-[3px] -right-[3px]"
      />
      <AiFillHeart
        size={24}
        className={`${hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}`}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Loading type="spin" color="white" width={10} hieght={10} />
        </div>
      )}
    </button>
  );
};

export default HeartButton;
