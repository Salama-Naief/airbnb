import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";

interface IParams {
  listingId: string;
}
export async function getListingById({ params }: { params: IParams }) {
  const { listingId } = params;
  if (typeof listingId !== "string") {
    return new Error();
  }
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    if (!listing) {
      return { status: "error", message: "something went wrong!" };
    }
    return { status: "success", listing };
  } catch (error: any) {
    return { status: "error", message: "something went wrong!" };
  }
}
