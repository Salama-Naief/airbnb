"use client";

import Image from "next/image";
import React, { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import useCountries from "@/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import HeartButton from "../Utils/HeartButton";
import Link from "next/link";
import { SafeReservation } from "@/types";
import ReservationUser from "./ReservationUser";
import Button from "../Utils/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReservationCartProps {
  reservation: SafeReservation;
  currentUser?: User | null;
}
const ReservationCart: React.FC<ReservationCartProps> = ({
  reservation,
  currentUser,
}) => {
  const listing = reservation?.listing;
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  /// handle reservation Date (start-end ) date
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  ///handle sellect user (owner|client)
  const user = useMemo(() => {
    if (currentUser?.id === reservation.userId) {
      return { status: "Owner", ...reservation.listing.user };
    } else if (currentUser?.id === reservation.listing.userId) {
      return { status: "Client", ...reservation.user };
    } else {
      return null;
    }
  }, [currentUser, reservation]);

  const handleCancel = useCallback(() => {
    setIsloading(true);
    axios
      .delete(`/api/reservations/${reservation.id}`)
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
  }, [reservation.id, router]);

  return (
    <div className="col-span-1 relative flex flex-col gap-2 shadow-md rounded-lg">
      <Link href={`/listing/${listing.id}`}>
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
            src={listing.imageSrc}
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
            alt={listing.title}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4 px-2">
        <div className="absolute top-4 right-4">
          <HeartButton
            currentUser={currentUser || null}
            listingId={listing.id}
          />
        </div>
        <div>
          <Link
            href={`/listing/${listing.id}`}
            className="font-bold capitalize"
          >
            {listing.title}
          </Link>
        </div>
        <div className=" text-neutral-500 text-sm font-light">
          {listing.category} - {location?.label}
        </div>
        <div className="font-light text-sm text-neutral-500">
          {reservationDate}
        </div>
        <ReservationUser user={user} />
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <div className="font-bold">${listing.price}</div>
            <div className="text-neutral-400 font-light">night</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold">${reservation.totalPrice}</div>
            <div className="text-neutral-400 font-light">night</div>
          </div>
        </div>
      </div>
      <Button
        label="Cancel Reservation"
        small
        onClick={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReservationCart;
