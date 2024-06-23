import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export const GET = async (req) => {
  const { limit, transaction_id } = extractQueryParams(req.url);

  let query = {
    orderBy: {
      createdAt: "desc",
    },
  };

  if (limit) {
    query.take = parseInt(limit, 10);
  }
  if (transaction_id) {
    query.where = {
      transaction_id,
    };
  }
  try {
    const response = await prisma.reservationInfo.findMany(query);
    const jsonResponse = JSON.stringify(response);
    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    };
    return new NextResponse(jsonResponse, {
      status: 200,
      headers,
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    const body = await req.json();
    // Update Transaction Status
    await prisma.reservationInfo.update({
      where: { id: body?.id },
      data: {
        [body.field]: body?.value,
      },
    });
    logger(
      userAgent,
      urlPath,
      "success",
      "PUT",
      `Updated ${body?.id} transaction status`
    );
    return successResponse("Success");
  } catch (error) {
    console.error(error);
    logger(
      userAgent,
      urlPath,
      "failed",
      "PUT",
      `Unable to updated ${body?.id} transaction status`
    );
    return errorResponse("Error occurred", 500);
  }
};

function extractQueryParams(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  return {
    limit: params.get("limit"),
    transaction_id: params.get("transaction_id"),
  };
}
