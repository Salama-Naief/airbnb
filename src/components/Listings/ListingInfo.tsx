"use client";

import React, { useMemo } from "react";
import Avatar from "../Utils/Avatar";
import { categories } from "@/utils/consts/categories.const";
import CategoryItem from "./CategoryItem";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  username: string;
  userImg: string | null | undefined;
  category: string;
  locationVal: string;
  guestcount: number;
  roomcount: number;
  bathrommcount: number;
  discription: string;
}

const Map = dynamic(() => import("../Utils/Map"), { ssr: false });
const ListingInfo: React.FC<ListingInfoProps> = ({
  username,
  userImg,
  category,
  locationVal,
  bathrommcount,
  guestcount,
  roomcount,
  discription,
}) => {
  const catItem = useMemo(() => {
    return categories.find((val) => val.label === category);
  }, [category]);

  const { getByValue } = useCountries();
  const location = getByValue(locationVal);
  return (
    <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
      <div className="flex flex-row items-center space-x-4">
        <div>Hosted by :</div>
        <div className="">{username}</div>
        <Avatar src={userImg} />
      </div>
      <hr />
      <div className="flex flex-row gap-4 text-neutral-700">
        <div className="flex items-center">{guestcount} preson</div>
        <div className="flex items-center">{roomcount} rooms</div>
        <div className="flex items-center">{bathrommcount} bathrooms</div>
      </div>
      <hr />
      {catItem && (
        <CategoryItem
          description={catItem?.description}
          label={catItem?.label}
          icon={catItem?.icon}
        />
      )}
      <hr />
      <div className="text-gray-500">{discription}</div>
      <hr />
      <Map center={location?.latlng} height="h-[60vh]" />
    </div>
  );
};

export default ListingInfo;
