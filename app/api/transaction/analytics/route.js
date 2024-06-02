import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = await prisma.reservationInfo.findMany({});
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
