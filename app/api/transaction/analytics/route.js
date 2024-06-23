import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";
export const fetchCache = "force-no-store";

export const GET = async (req) => {
  try {
    const response = await prisma.reservationInfo.findMany({});
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
