import { Listing, Reservation, User } from "@prisma/client";
import { omit } from "lodash";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerificied"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerificied: string | null;
};
export type currentUser = User;

export type LocationType = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};
export type RentTypes = {
  category: string;
  location: LocationType | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
  type: "create" | "update";
  listingId: string;
};
export type SafeListing = Omit<Listing, "user"> & {
  user: {
    name: string;
    image: string;
    id: string;
  };
};

export type SafeReservation = Omit<Reservation, "listing" | "user"> & {
  listing: SafeListing;
  user: {
    name: string;
    image: string;
    id: string;
  };
};
