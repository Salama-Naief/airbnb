"use client";

import ListingHead from "@/components/Listings/ListingHead";
import ListingInfo from "@/components/Listings/ListingInfo";
import ListingReservation from "@/components/Listings/ListingReservation";
import { SafeListing } from "@/types";
import { Reservation, User } from "@prisma/client";
import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import React, { useMemo } from "react";

interface ListingClientProps {
  data: SafeListing;
  currentUser: User | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  data,
  currentUser,
  reservations,
}) => {
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  if (!data) {
    return notFound();
  }

  return (
    <div className="py-10">
      <ListingHead
        locatactionVal={data.locationValue}
        img={data.imageSrc}
        title={data.title}
        listingId={data.id}
        currentUser={currentUser}
      />
      <div className="grid md:grid-cols-7 gap-10">
        <ListingInfo
          userImg={data.user?.image}
          username={data.user?.name || ""}
          category={data.category}
          locationVal={data.locationValue}
          guestcount={data.guestCount}
          roomcount={data.roomCount}
          bathrommcount={data.bathroomCount}
          discription={data.description}
        />
        <div
          className="
            col-span-1 md:col-span-3 
          "
        >
          <ListingReservation
            price={data.price}
            listingId={data.id}
            currentUser={currentUser}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
