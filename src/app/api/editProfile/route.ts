import { authOptions } from "@/config/auth";
import prisma from "@/config/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    const body = await req.json();
    const checkSession = await getServerSession(authOptions);
    if (checkSession) {
      const updateData = await prisma.user.update({
        where: { id: body.id },
        data: { name: body.userName },
      });
      if (updateData) {
        return NextResponse.json({
          updateData,
          message: "Profile Has been Updated",
        });
      } else {
        return NextResponse.json(
          {
            message: "sorry something is wrong",
          },
          {
            status: 401,
          }
        );
      }
    } else {
      return NextResponse.json(
        {
          message: "Please Login",
        },
        {
          status: 403,
        }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "something Wrong" },
      {
        status: 500,
      }
    );
  }
};
