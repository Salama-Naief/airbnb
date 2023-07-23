"use client";

import React from "react";
import { Reservation, User } from "@prisma/client";
import { SafeReservation } from "@/types";
import ReservationCart from "@/components/resarvation/ReservationCart";
import Heading from "@/components/Utils/Heading";

interface TripsClientProps {
  currentUser: User;
  reservation: SafeReservation[];
}
const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservation,
}) => {
  return (
    <main className="relative py-12 container mx-auto">
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
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
        {reservation.map((res) => (
          <ReservationCart
            key={res.id}
            reservation={res}
            currentUser={currentUser}
          />
        ))}
      </div>
    </main>
  );
};

export default TripsClient;
