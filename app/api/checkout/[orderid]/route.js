import prisma from "@/utils/dbConnect";
import { errorResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    //    check if a record exist with the slug
    const transaction = await prisma.reservationInfo.findMany({
      where: {
        transaction_id: params.orderid,
      },
    });
    if (!transaction) {
      return errorResponse("No Record found with the ID Provided", 500);
    }
    return new NextResponse(JSON.stringify(transaction, { status: 200 }));
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong!", 500);
  }
};
