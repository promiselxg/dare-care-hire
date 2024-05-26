import prisma from "@/utils/dbConnect";
import { errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    //    check if a record exist with the slug
    const transaction = await prisma.reservationInfo.findMany({
      where: {
        transaction_id: params.orderid,
      },
    });
    if (!transaction || transaction.length < 1) {
      return errorResponse("No Record found with the ID Provided", 500);
    }
    return new NextResponse(JSON.stringify(transaction, { status: 200 }));
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong!", 500);
  }
};
