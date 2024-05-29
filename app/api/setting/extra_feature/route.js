import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const response = await prisma.ExtraFeatures.findMany({
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
    const itemExist = await prisma.ExtraFeatures.count({
      where: {
        extra_feature: formData?.title,
      },
    });
    if (itemExist) {
      return errorResponse("Record already exist.", 400);
    } else {
      await prisma.ExtraFeatures.create({
        data: {
          extra_feature: formData.title,
          amount: parseFloat(formData.amount),
        },
      });
      return successResponse("success", 201);
    }
  } catch (error) {
    console.log(error);
    return errorResponse("An unknown error occured.", 500);
  }
};

export const PUT = async (req) => {
  const body = await req.json();
  console.log(body);
  if (!body?.value || !body?.field || !body.id) {
    return errorResponse("Please fill out the form.", 403);
  }
  try {
    await prisma.ExtraFeatures.update({
      where: { id: body?.id },
      data: {
        [body.field]: body.value,
      },
    });
    return successResponse("success");
  } catch (error) {
    console.log(error);
    return errorResponse("Error occurred", 500);
  }
};
