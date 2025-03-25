import { NextResponse } from "next/server";
import prisma from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { cookies } from "next/headers";
export async function GET(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const serverSession = await getServerSession(authOptions);
    const cookiesStore = await cookies();
    let ip = forwarded
      ? forwarded.split(",")[0]
      : req.headers.get("cf-connecting-ip") || "unknown";
    if (ip === "::1") {
      ip = "unknown";
    }
    let guestID = null;
    if (ip === "unknown") {
      guestID = cookiesStore.get("localID")?.value;
    } else guestID = ip;

    if (serverSession) {
      const userData = await prisma.shortUrl.findMany({
        where: { userID: serverSession?.user?.id },
        select: {
          id: true,
          original: true,
          short: true,
          clicks: true,
          createdAt: true,
          isLocked: true,
          qrCode: true,
        },
      });
      return NextResponse.json(userData);
    } else {
      const userData = await prisma.shortUrl.findMany({
        where: { guestID: guestID },
        select: {
          id: true,
          original: true,
          short: true,
          clicks: true,
          createdAt: true,
          isLocked: true,
          qrCode: true,
        },
      });

      return NextResponse.json(userData);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
