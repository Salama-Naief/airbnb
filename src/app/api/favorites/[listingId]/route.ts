import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrent";

interface IParams {
  listingId: string;
}

//add to favorite
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you must be logedin!" }],
    });
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "invalide id formate!" }],
    });
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  if (listing?.userId === currentUser.id) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you can add your listing to your favorites!" }],
    });
  }
  const favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  if (!user) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "some thing went wrong!" }],
    });
  }

  return NextResponse.json({
    status: "success",
    user: { ...user, hashedPassword: "" },
  });
}

//delete favorite
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const { listingId } = params;
  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you must be logedin!" }],
    });
  }

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "invalide id formate!" }],
    });
  }

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  if (listing?.userId === currentUser.id) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "you can add your listing to your favorites!" }],
    });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  if (!user) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "some thing went wrong!" }],
    });
  }

  return NextResponse.json({
    status: "success",
    user: { ...user, hashedPassword: "" },
  });
}
