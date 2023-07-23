import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import getCurrentUser from "./getCurrent";

export interface IParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export async function getListings(params: IParams) {
  const query: any = {};
  const {
    userId,
    bathroomCount,
    category,
    endDate,
    guestCount,
    locationValue,
    roomCount,
    startDate,
  } = params;
  try {
    if (userId) {
      query.userId = userId;
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (category) {
      query.category = category;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings: Listing[] = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!listings) {
      return { status: "error", message: "something went wrong!" };
    }
    return { status: "success", listings };
  } catch (error: any) {
    return { status: "error", message: "something went wrong!" };
  }
}
