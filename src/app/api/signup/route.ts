import prisma from "@/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (!body.userName || !body.email || !body.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existUser) {
      return NextResponse.json(
        { message: "This Email already exists" },
        { status: 405 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.userName,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User has been successfully registered",
      data: createUser,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred", error });
  }
};
