import prisma from "@/lib/prisma";
import { Reservation } from "@prisma/client";
import { z } from "zod";

interface IParams {
  listingId?: string;
  userId?: string;
  autherId?: string;
}
export default async function getReservations(params: IParams) {
  const { autherId, listingId, userId } = params;
  const query: any = {};

  if (listingId) query.listingId = listingId;
  if (userId) query.userId = userId;
  if (autherId) query.listing = { userId: autherId };

  try {
    const reservation: Reservation[] = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!reservation) {
      return { status: "error", message: "something went wrong!" };
    }
    return { status: "success", reservation };
  } catch (error: any) {
    return { status: "error", message: "something went wrong!" };
  }
}
