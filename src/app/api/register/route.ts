import { hash } from "bcryptjs";
import prisma from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { registerShema } from "./registerShema";

export async function POST(request: Request) {
  const body = await request.json();
  const response = registerShema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;
    return NextResponse.json({
      status: "error",
      errors: errors,
    });
  }

  const { username, email, password } = body;
  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existUser) {
    return NextResponse.json({
      status: "error",
      errors: [{ message: "this email is already exist.please login!" }],
    });
  }
  const hashPassword = await hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name: username,
      email: email,
      hashedPassword: hashPassword,
    },
  });
  return NextResponse.json({
    status: "ok",
    user: { id: user?.id, name: user?.name, email: user?.email },
  });
}
