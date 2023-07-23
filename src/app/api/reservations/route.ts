import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resaveShema } from "./reserveShema";
import getCurrentUser from "@/app/actions/getCurrent";
import { differenceInDays } from "date-fns";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();
  //   const response = resaveShema.safeParse(body);
  //   console.log("body", body);
  //   if (!response.success) {
  //     const { errors } = response.error;
  //     return NextResponse.json({
  //       status: "error",
  //       errors: errors,
  //     });
  //   }
  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you must be loggedin!" }],
    });
  }
  const { startDate, endDate, listingId } = body;
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  if (listing?.user.id === currentUser.id) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you can not reserve you home!" }],
    });
  }
  const dayCount = differenceInDays(new Date(endDate), new Date(startDate));

  if (!listing || !dayCount) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "listing is not found or no days select!" }],
    });
  }

  const totalPrice = listing.price * dayCount;

  const reseration = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          endDate,
          startDate,
          userId: currentUser.id,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json({
    status: "success",
    reseration,
  });
}
