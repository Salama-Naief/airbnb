"use client";

import React, { useCallback, useState } from "react";
import { Listing, User } from "@prisma/client";
import Heading from "@/components/Utils/Heading";
import ListingCart from "@/components/Listings/ListingCart";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setRent } from "@/redux/hooks/rentSlice";
import useCountries from "@/hooks/useCountries";
import { onOpen } from "@/redux/hooks/useRentSlice";

interface PropertiesClientProps {
  currentUser: User;
  listings: Listing[];
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { getByValue } = useCountries();

  //handle listing delete
  const handleDelete = (id: string) => {
    setIsloading(true);
    axios
      .delete(`/api/listings/${id}`)
      .then(({ data }) => {
        if (data.status === "success") {
          toast.success(data.message);
          router.refresh();
        } else if (data.status === "error") {
          toast.error(data.message);
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("something went wrong!");
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  //handle listing update
  const handleUpdate = (listing: Listing) => {
    const location = getByValue(listing.locationValue);
    dispatch(onOpen());
    dispatch(
      setRent({
        bathroomCount: listing.bathroomCount,
        category: listing.category,
        description: listing.description,
        guestCount: listing.guestCount,
        imageSrc: listing.imageSrc,
        listingId: listing.id,
        location: location,
        price: listing.price,
        roomCount: listing.roomCount,
        title: listing.title,
        type: "update",
      })
    );
  };
  return (
    <main className="relative py-12 container mx-auto">
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
        my-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
      >
        {listings.map((listing) => (
          <ListingCart
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionLabel="Delete"
            onClick={handleDelete}
            isLoading={isLoading}
            secondaryLabel="Update"
            onSecondaryClick={(listing) => handleUpdate(listing)}
          />
        ))}
      </div>
    </main>
  );
};

export default PropertiesClient;
