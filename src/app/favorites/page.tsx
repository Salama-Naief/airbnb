import React from "react";
import getCurrentUser from "../actions/getCurrent";
import EmptyState from "@/components/Utils/EmptyState";
import { notFound } from "next/navigation";
import FavoritesClient from "./FavoritesClient";
import { getFavorites } from "../actions/getFavorites";

async function FavoritesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const ListingData: any = await getFavorites();
  console.log("listing data", ListingData);
  if (!ListingData || ListingData.status === "error") {
    return notFound();
  }

  if (ListingData.listings?.length <= 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
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

export default FavoritesPage;
