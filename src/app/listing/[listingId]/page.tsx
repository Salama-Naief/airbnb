import { getListingById } from "@/app/actions/getListingById";
import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrent";
import getReservations from "@/app/actions/getReservation";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

interface IParams {
  listingId: string;
  userId?: string;
  autherId?: string;
}

type Props = {
  params: IParams;
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const listingData: any = await getListingById({ params });

  return {
    title: listingData.status === "error" ? "Error" : listingData.listing.title,
  };
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
