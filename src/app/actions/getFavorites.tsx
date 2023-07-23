import prisma from "@/lib/prisma";
import getCurrentUser from "./getCurrent";

export async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { status: "error", message: "you must be loggedin!" };
    }
    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
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
