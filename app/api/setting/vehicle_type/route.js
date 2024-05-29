import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = await prisma.vehicleType.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (error) {
    console.log(error);
    return errorResponse("An unknown error occured.", 500);
  }
};

export const POST = async (req) => {
  try {
    const { formData } = await req.json();
    if (!formData) {
      return errorResponse("Please fill out the form.", 404);
    }
    const itemExist = await prisma.vehicleType.count({
      where: {
        vehicle_type: formData,
      },
    });
    if (itemExist) {
      return errorResponse("Vehicle Type already exist.", 400);
    } else {
      await prisma.vehicleType.create({
        data: {
          vehicle_type: formData,
        },
      });
      return successResponse("success", 201);
    }
  } catch (error) {
    return errorResponse("An unknown error occured.", 500);
  }
};

export const PUT = async (req) => {
  const { formData } = await req.json();
  if (!formData?.value || !formData?.field || !formData.id) {
    return errorResponse("Please fill out the form.", 403);
  }
  try {
    await prisma.vehicleType.update({
      where: { id: formData?.id },
      data: {
        [formData.field]: formData.value,
      },
    });
    return successResponse("success");
  } catch (error) {
    return errorResponse("Error occurred", 500);
  }
};
