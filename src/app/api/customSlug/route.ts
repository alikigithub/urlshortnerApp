import { authOptions } from "@/config/auth";
import prisma from "@/config/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const checkSession = await getServerSession(authOptions);
    if (!checkSession) {
      NextResponse.json(
        {
          message: "login First",
        },
        {
          status: 403,
        }
      );
    }
    const qrCodeGenerate = await QRCode.toDataURL(body.originalLink);
    const shortUrl = `https://url-ten-psi.vercel.app/${body.cutomSlug}`;
    const findShortUrl = await prisma.shortUrl.findUnique({
      where: { short: shortUrl },
    });
    if (findShortUrl) {
      return NextResponse.json(
        {
          message: "sorry This Url Already Exists",
        },
        {
          status: 401,
        }
      );
    }
    await prisma.shortUrl.create({
      data: {
        userID: checkSession?.user.id,
        original: body.originalLink,
        short: shortUrl,
        qrCode: qrCodeGenerate,
        clicks: 0,
        isLocked: false,
      },
    });

    const formattedDate = new Date().toLocaleDateString("en-GB");

    return NextResponse.json(
      {
        message: "URL has been generated",
        userID: checkSession?.user.id,
        original: body.originalLink,
        short: shortUrl,
        qrCode: qrCodeGenerate,
        clicks: 0,
        createdAt: formattedDate,
        isLocked: false,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
};
