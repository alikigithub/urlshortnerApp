import { authOptions } from "@/config/auth";
import prisma from "@/config/db";
import { generateShortURL } from "@/utlis/shortUrl";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
export const POST = async (req: Request) => {
  const body = await req.json();
  try {
    const checkSession = await getServerSession(authOptions);
    const cookiesStore = await cookies();
    let searchCount = null;

    let guestID: string | null = cookiesStore.get("localID")?.value || null;
    const id = checkSession?.user?.id || null;

    if (!checkSession) {
      const forwarded = req.headers.get("x-forwarded-for");
      let ip = forwarded
        ? forwarded.split(",")[0]
        : req.headers.get("cf-connecting-ip") || "unknown";
      if (ip === "::1") {
        ip = "unknown";
      }
      if (ip !== "unknown") guestID = ip;

      if (!guestID) {
        const uniqueId = nanoid(4);
        cookiesStore.set("localID", uniqueId, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
        });
        guestID = uniqueId;
      }
      const existingGuest = await prisma.guestUser.findUnique({
        where: { guestID },
      });
      if (existingGuest) {
        searchCount = existingGuest.searchCount;
        if (existingGuest.searchCount >= 5) {
          return NextResponse.json(
            { message: "Sorry, Login First" },
            {
              status: 403,
            }
          );
        }
        await prisma.guestUser.update({
          where: { guestID },
          data: { searchCount: { increment: 1 } },
        });
      } else {
        await prisma.guestUser.create({
          data: { guestID: guestID || "unknown", searchCount: 1 },
        });
      }
    }

    const qrCodeGenerate = await QRCode.toDataURL(body.originalLink);
    const shortUrl = generateShortURL();
    await prisma.shortUrl.create({
      data: {
        userID: id,
        original: body.originalLink,
        short: shortUrl,
        qrCode: qrCodeGenerate,
        clicks: 0,
        isLocked: false,
        guestID: checkSession ? null : guestID,
      },
    });

    const formattedDate = new Date().toLocaleDateString("en-GB");

    return NextResponse.json(
      {
        message: "URL has been generated",
        userID: id,
        original: body.originalLink,
        short: shortUrl,
        qrCode: qrCodeGenerate,
        clicks: 0,
        createdAt: formattedDate,
        isLocked: false,
        searchCount,
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
