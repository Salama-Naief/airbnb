"use client";

import React from "react";
import { Reservation, User } from "@prisma/client";
import { SafeReservation } from "@/types";
import ReservationCart from "@/components/resarvation/ReservationCart";
import Heading from "@/components/Utils/Heading";

interface ReservationClientProps {
  currentUser: User;
  reservation: SafeReservation[];
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  currentUser,
  reservation,
}) => {
  console.log("res", reservation);
  return (
    <main className="relative py-12 container mx-auto">
      <Heading title="Reservations" subtitle="Bookings on your properties" />
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

export default ReservationClient;
