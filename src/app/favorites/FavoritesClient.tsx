"use client";

import React from "react";
import { Listing, Reservation, User } from "@prisma/client";
import { SafeReservation } from "@/types";
import ReservationCart from "@/components/resarvation/ReservationCart";
import Heading from "@/components/Utils/Heading";
import ListingCart from "@/components/Listings/ListingCart";

interface FavoritesClientProps {
  currentUser: User;
  listings: Listing[];
}
const TripsClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
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
          />
        ))}
      </div>
    </main>
  );
};

export default TripsClient;
