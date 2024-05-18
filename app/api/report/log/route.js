import prisma from "@/utils/dbConnect";
import { errorResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    const response = await prisma.logger.findMany();
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get all outsourced drivers");
    return errorResponse("Something went wrong!", 500);
  }
};
