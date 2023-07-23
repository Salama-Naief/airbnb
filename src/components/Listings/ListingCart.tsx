"use client";

import Image from "next/image";
import React from "react";
import useCountries from "@/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import HeartButton from "../Utils/HeartButton";
import Link from "next/link";
import Button from "../Utils/Button";

interface ListingCartProps {
  data: Listing;
  currentUser?: User | null;
  actionLabel?: string;
  onClick?: (id: string) => void;
  secondaryLabel?: string;
  onSecondaryClick?: (listing: Listing) => void;
  isLoading?: boolean;
}
const ListingCart: React.FC<ListingCartProps> = ({
  data,
  currentUser,
  actionLabel,
  onClick,
  isLoading,
  onSecondaryClick,
  secondaryLabel,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const price = data.price;
  return (
    <div className="col-span-1 relative flex flex-col gap-2 shadow-md rounded-lg ">
      <Link href={`/listing/${data.id}`}>
        <div
          className="
        w-full
        aspect-square
        overflow-hidden
        relative
        rounded-xl
        "
        >
          <Image
            src={data.imageSrc}
            fill
            className="
          object-cover 
          w-full 
          h-full 
          transition-all
          hover:scale-105
          rounded-xl
          cursor-pointer
          duration-200
          "
            alt={data.title}
          />
        </div>
      </Link>
      <div className="px-2 flex flex-col gap-2 pb-2 flex-1">
        <div className="absolute top-4 right-4">
          <HeartButton currentUser={currentUser || null} listingId={data.id} />
        </div>
        <div>
          <Link href={`/listing/${data.id}`} className="font-bold capitalize">
            {data.title}
          </Link>
        </div>
        <div className=" text-neutral-500 ">
          {data.category} - {location?.label}
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="font-bold">${price}</div>
          <div className="text-neutral-400">night</div>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-row">
        {secondaryLabel && onSecondaryClick && (
          <Button
            label={secondaryLabel}
            isLoading={isLoading}
            small
            onClick={() => onSecondaryClick(data)}
            outline
          />
        )}
        {actionLabel && onClick && (
          <Button
            label={actionLabel}
            isLoading={isLoading}
            small
            onClick={() => onClick(data.id)}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCart;
