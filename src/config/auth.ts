import prisma from "@/config/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
            },
          });
          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials?.password as string,
              user.password as string
            );
            if (isPasswordValid) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Error", error as Error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.email && session?.user) {
        const user = await prisma?.user?.findUnique({
          where: { email: token?.email },
        });
        if (user) {
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.id = user.id;
        }
      }
      return session;
    },
  },
};
