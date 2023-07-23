import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrent";
import prisma from "../../../lib/prisma";
import { rentShema } from "./rentShema";

export async function POST(request: Request) {
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
  const listing = await prisma.listing.create({
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
    message: "your home added successfully",
  });
}
