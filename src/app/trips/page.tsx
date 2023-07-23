import React from "react";
import getReservations from "../actions/getReservation";
import getCurrentUser from "../actions/getCurrent";
import EmptyState from "@/components/Utils/EmptyState";
import { notFound } from "next/navigation";
import TripsClient from "./TripsClient";

async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservData: any = await getReservations({ userId: currentUser.id });
  if (!reservData || reservData.status === "error") {
    return notFound();
  }

  return (
    <div>
      <TripsClient
        currentUser={currentUser}
        reservation={
          reservData.status === "success" ? reservData.reservation : []
        }
      />
    </div>
  );
}

export default TripsPage;
