import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { formatDateTime } from "@/utils/getDateDifference";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const inputValue = await req.json();
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];

  if (!isInputValuesValid(inputValue)) {
    return errorResponse("Invalid input values", 400);
  }
  const { date, ...rest } = inputValue;
  try {
    // Format dates
    const formattedDate = formatDateTime(date);
    const vendor = await prisma.outsourcedDriver.create({
      data: {
        ...rest,
        amount: parseInt(inputValue.amount),
        date: formattedDate,
      },
    });
    if (vendor) {
      logger(
        userAgent,
        urlPath,
        "success",
        "POST",
        "outsourced driver created successfully"
      );
      return successResponse("success");
    } else {
      return errorResponse("Unable to create outsourced driver", 500);
    }
  } catch (error) {
    logger(
      userAgent,
      urlPath,
      "failed",
      "POST",
      "Error creating outsourced driver"
    );
    return errorResponse("Error creating outsourced driver", 500);
  }
};

export const GET = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    const response = await prisma.outsourcedDriver.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get all outsourced drivers");
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

export const PUT = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  const body = await req.json();

  if (!body?.value || !body?.field || !body.id) {
    return errorResponse("Please fill out the form.", 403);
  }
  try {
    await prisma.outsourcedDriver.update({
      where: { id: body?.id },
      data: {
        [body.field]: body.value,
      },
    });

    logger(userAgent, urlPath, "success", "PUT", "Update vendor's information");
    return successResponse("success");
  } catch (error) {
    logger(
      userAgent,
      urlPath,
      "failed",
      "PUT",
      "Update vendor's information failed"
    );
    return errorResponse("Error occurred", 500);
  }
};

const isInputValuesValid = (input) => {
  return (
    input.driver_name &&
    input.description &&
    input.date &&
    input.amount &&
    input.vehicle_type
  );
};
