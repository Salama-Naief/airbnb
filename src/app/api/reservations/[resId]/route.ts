import prisma from "@/lib/prisma";
import getCurrentUser from "@/app/actions/getCurrent";
import { NextResponse } from "next/server";

interface IParams {
  resId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { resId } = params;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({
      status: "error",
      message: "you must be loggedin!",
    });
  }

  if (!resId || typeof resId !== "string") {
    return NextResponse.json({
      status: "error",
      message: "invalid id formate!",
    });
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: resId,
      OR: [
        { userId: currentUser.id },
        {
          listing: {
            userId: currentUser.id,
          },
        },
      ],
    },
  });

  if (!reservation) {
    return NextResponse.json({
      status: "error",
      message: "something went wrong!",
    });
  }
  return NextResponse.json({
    status: "success",
    message: "reservation seleted successfuly!",
  });
}
