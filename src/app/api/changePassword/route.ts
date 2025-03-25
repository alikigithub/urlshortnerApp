import prisma from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const PUT = async (req: Request) => {
  const body = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message: "Please Login First",
      },
      {
        status: 401,
      }
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });
  if (!user) {
    return NextResponse.json(
      {
        message: "No User existe",
      },
      {
        status: 404,
      }
    );
  }
  const comparePassword = await bcrypt.compare(body.oldPassword, user.password);
  if (!comparePassword) {
    return NextResponse.json(
      {
        message: "Your Old Password is incorrect",
      },
      {
        status: 405,
      }
    );
  }
  const hashPassword = await bcrypt.hash(body.newpassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      password: hashPassword,
    },
  });
  return NextResponse.json(
    {
      message: "Your Password has been updated",
    },
    {
      status: 200,
    }
  );
};
