import { authOptions } from "@/config/auth";
import prisma from "@/config/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const body = await req.json();
  try {
    const checkSession = await getServerSession(authOptions);
    if (checkSession) {
      const editTable = await prisma.shortUrl.update({
        where: { id: body.id },
        data: { original: body.original, isLocked: body.isLocked },
      });
      return NextResponse.json(
        editTable,

        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Login Plesae",
        },
        {
          status: 403,
        }
      );
    }
  } catch {
    NextResponse.json(
      {
        message: "somehting Wrong",
      },
      {
        status: 500,
      }
    );
  }
};

////////////////
export const DELETE = async (req: Request) => {
  const body = await req.json();
  try {
    const checkSession = await getServerSession(authOptions);
    if (checkSession) {
      const DeleteData = await prisma.shortUrl.delete({
        where: {
          id: body.id,
        },
      });
      return NextResponse.json(DeleteData, {
        status: 200,
      });
    } else {
      return NextResponse.json(
        {
          message: "login First",
        },
        {
          status: 403,
        }
      );
    }
  } catch {
    return NextResponse.json(
      {
        message: "something wrong",
      },
      {
        status: 500,
      }
    );
  }
};
