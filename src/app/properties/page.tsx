import React from "react";
import getCurrentUser from "../actions/getCurrent";
import EmptyState from "@/components/Utils/EmptyState";
import { notFound } from "next/navigation";
import FavoritesClient from "./PropertiesClient";
import { getFavorites } from "../actions/getFavorites";
import { getListings } from "../actions/getListings";

async function PopertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const ListingData: any = await getListings({ userId: currentUser.id });
  console.log("listing data", ListingData);
  if (!ListingData || ListingData.status === "error") {
    return notFound();
  }

  if (ListingData.listings?.length <= 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <div>
      <FavoritesClient
        currentUser={currentUser}
        listings={ListingData.status === "success" ? ListingData.listings : []}
      />
    </div>
  );
}

export default PopertiesPage;
