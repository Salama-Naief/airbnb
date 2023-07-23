import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    if (!session?.user?.email) return null;
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) return null;

    return { ...currentUser, hashpassword: "" };
  } catch (error) {
    return null;
  }
}
