import prisma from "@/config/db";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ short: string }> }
) => {
  const shortData = await params;
  const shortUrlData = shortData.short;
  const data = await prisma.shortUrl.findUnique({
    where: { short: `http://localhost:3000/${shortUrlData}` },
    select: { original: true, clicks: true, isLocked: true },
  });
  if (!data) {
    return NextResponse.json(
      {
        message: "sorry no such url",
      },
      {
        status: 401,
      }
    );
  }
  if (data.isLocked) {
    return NextResponse.json(
      { message: "this url is locked" },
      {
        status: 403,
      }
    );
  }
  await prisma.shortUrl.update({
    where: { short: `http://localhost:3000/${shortUrlData}` },
    data: { clicks: data.clicks + 1 },
  });

  return NextResponse.redirect(data?.original || "/", 301);
};
