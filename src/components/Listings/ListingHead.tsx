"use client";

import useCountries from "@/hooks/useCountries";
import React from "react";
import Heading from "../Utils/Heading";
import Image from "next/image";
import HeartButton from "../Utils/HeartButton";
import { User } from "@prisma/client";

interface ListingHeadProps {
  img: string;
  title: string;
  locatactionVal: string;
  currentUser: User | null;
  listingId: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  img,
  title,
  currentUser,
  listingId,
  locatactionVal,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locatactionVal);

  return (
    <div className="mb-10">
      <Heading
        title={title}
        subtitle={`${location?.region} - ${location?.label}`}
      />
      <div className="w-full h-[60vh] relative rounded-xl overflow-hidden my-5">
        <Image src={img} alt={title} fill className="object-cover" />
        <div className="absolute top-4 right-4">
          <HeartButton listingId={listingId} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
