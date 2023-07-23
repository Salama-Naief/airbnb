import React from "react";
import getReservations from "../actions/getReservation";
import getCurrentUser from "../actions/getCurrent";
import EmptyState from "@/components/Utils/EmptyState";
import { notFound } from "next/navigation";
import ReservationClient from "./ReservationClient";

async function ReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservData: any = await getReservations({ autherId: currentUser.id });
  if (!reservData || reservData.status === "error") {
    return notFound();
  }

  return (
    <div>
      <ReservationClient
        currentUser={currentUser}
        reservation={
          reservData.status === "success" ? reservData.reservation : []
        }
      />
    </div>
  );
}

export default ReservationPage;
