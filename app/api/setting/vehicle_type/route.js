import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  return new NextResponse(JSON.stringify("success"), { status: 200 });
};

export const POST = async (req) => {
  try {
    const { formData } = await req.json();
    if (!formData) {
      return errorResponse("Please fill out the form.", 404);
    }
    const itemExist = await prisma.vehicleType.findOne({
      where: {
        vehicle_type: formData,
      },
    });
    if (itemExist) {
      return errorResponse("Vehicle Type already exist.", 400);
    } else {
      await prisma.vehicleType.creat({
        data: {
          vehicle_type: formData,
        },
      });
      return successResponse("success.", 201);
    }
  } catch (error) {
    console.error(error);
    return new Err(JSON.stringify("error"), { status: 500 });
  }
};
