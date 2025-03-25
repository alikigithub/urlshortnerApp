import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "@/config/db";
import bcrypt from "bcryptjs";
export const POST = async (req: Request) => {
  const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;
  try {
    const body = await req.json();

    const decode = jwt.verify(body.token, SECRET_KEY) as jwt.JwtPayload;
    if (!decode) {
      return NextResponse.json(
        {
          messgae: "token is invalid",
        },
        {
          status: 403,
        }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decode.id,
        reset_token: body.token,
      },
    });
    if (!user || !user.reset_token || !user.reset_token_expiration) {
      return NextResponse.json(
        {
          message: "sorry token has been expired",
        },
        {
          status: 404,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await prisma.user.update({
      where: { id: decode.id },
      data: {
        password: hashedPassword,
        reset_token: null,
        reset_token_expiration: null,
      },
    });
    return NextResponse.json(
      {
        message: "Password Successfull changed",
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
