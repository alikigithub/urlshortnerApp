import prisma from "@/config/db";
import { NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { getServerSession } from "next-auth";
const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

export const GET = async (req: Request) => {
  try {
    const sessiondata = await getServerSession();
    if (!sessiondata) return NextResponse.json({ message: "not working" });
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if (!token) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 405 });
    }

    const decode = Jwt.verify(token, SECRET_KEY) as Jwt.JwtPayload;
    if (!decode) {
      return NextResponse.json(
        { message: "Invalid User or token expire" },
        { status: 401 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: decode.id, reset_token: token },
    });
    if (!user || !user.reset_token_expiration) {
      return NextResponse.json(
        { message: "Invalid User or token expire " },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        message: "token is  valid",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Something wrong with Json Token",
      },
      {
        status: 500,
      }
    );
  }
};
