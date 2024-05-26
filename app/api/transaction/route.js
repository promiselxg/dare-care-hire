import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

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
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

function extractQueryParams(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  return {
    limit: params.get("limit"),
    transaction_id: params.get("transaction_id"),
  };
}
