"use client";

import React, { useMemo } from "react";
import Avatar from "../Utils/Avatar";

interface ReservationUserProps {
  user: {
    name: string;
    image: string;
    id: string;
    status: string;
  } | null;
}
const ReservationUser: React.FC<ReservationUserProps> = ({ user }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-neutral-400">{user?.status}:</p>
      <Avatar src={user?.image} />
      <p className="capitalize">{user?.name}</p>
    </div>
  );
};

export default ReservationUser;
