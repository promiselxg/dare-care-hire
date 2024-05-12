import prisma from "@/utils/dbConnect";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(process.env.HOST_URL)[1];
  try {
    //    check if a record exist with the slug
    const itemExist = await prisma.vehicleInfo.findUnique({
      where: {
        slug: params.slug,
      },
    });
    if (!itemExist) {
      logger(userAgent, urlPath, "failed", "GET", "get vehicle details");
      return new NextResponse(
        JSON.stringify(
          { message: "No Record found with the ID Provided" },
          { status: 500 }
        )
      );
    }
    return new NextResponse(JSON.stringify(itemExist, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get vehicle details");
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
