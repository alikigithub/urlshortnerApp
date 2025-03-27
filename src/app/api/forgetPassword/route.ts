import { NextResponse } from "next/server";
import prisma from "@/config/db";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
export const POST = async (req: Request) => {
  const SECRET_KEY = process.env.NEXTAUTH_SECRET as string;

  try {
    const body = await req.json();
    const userExist = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!userExist) {
      return NextResponse.json(
        { message: "This Email is not registered" },
        { status: 405 }
      );
    }
    const tokenGenerator = jwt.sign({ id: userExist.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    const setExpirationTime = new Date();
    setExpirationTime.setHours(setExpirationTime.getHours() + 1);
    await prisma.user.update({
      where: { email: body.email },
      data: {
        reset_token: tokenGenerator as string,
        reset_token_expiration: setExpirationTime as Date,
      },
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const resetLink = `http://localhost:3000/?token=${tokenGenerator}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: body.email,
      subject: "Reset Password",
      html: `Click on the <a href=${resetLink}>link</a> to reset your password`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error Occured" }, { status: 500 });
  }
};
