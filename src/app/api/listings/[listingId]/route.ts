import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrent";
import { NextResponse } from "next/server";
import { rentShema } from "../rentShema";

interface IParams {
  listingId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { listingId } = params;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      message: "you must be loggedin!",
    });
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({
      status: "error",
      message: "invalid id formate!",
    });
  }

  const listings = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  if (!listings) {
    return NextResponse.json({
      status: "error",
      message: "something went wrong!",
    });
  }
  return NextResponse.json({
    status: "success",
    message: "listing deleted successfuly!",
  });
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  const { listingId } = params;
  const body = await request.json();
  const response = rentShema.safeParse(body);
  const currentUser = await getCurrentUser();
  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json({
      status: "error",
      errors: errors,
    });
  }
  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you must be logedin!" }],
    });
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({
      status: "error",
      message: "invalid id formate!",
    });
  }

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;
  const listing = await prisma.listing.updateMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
    data: {
      bathroomCount,
      category,
      description,
      guestCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price),
      roomCount,
      title,
      userId: currentUser.id,
    },
  });

  return NextResponse.json({
    status: "success",
    message: "your home updated successfully",
  });
}
