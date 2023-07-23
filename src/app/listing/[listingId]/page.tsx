import { getListingById } from "@/app/actions/getListingById";
import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrent";
import getReservations from "@/app/actions/getReservation";
import ListingSkeleton from "@/skeletons/ListingSkeleton";
import { notFound } from "next/navigation";

interface IParams {
  listingId: string;
  userId?: string;
  autherId?: string;
}
const Listing = async ({ params }: { params: IParams }) => {
  const listingData: any = await getListingById({ params });
  const currentUser = await getCurrentUser();
  const resData: any = await getReservations(params);

  if (resData.status === "error" || listingData.status === "error") {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-0">
      <ListingClient
        data={listingData.status === "success" ? listingData.listing : null}
        reservations={resData.status === "success" ? resData.reservation : []}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Listing;
