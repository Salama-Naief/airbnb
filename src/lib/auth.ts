import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitGubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOOGLE_CLIENT_SCERET as string,
    }),
    GitGubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SCERET as string,
    }),
    CredentialsProvider({
      name: "login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("wrong credentials!");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("wrong credentials!");
        }

        const isPasswordMatch = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordMatch) {
          throw new Error("wrong credentials!");
        }

        return {
          id: user.id,
          email: user.email,
          neme: user.name,
        };
      },
    }),
  ],

  debug: process.env.NODE_ENV === "development",
};

export { authOptions };
