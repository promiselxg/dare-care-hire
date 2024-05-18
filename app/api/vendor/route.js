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
    return new NextResponse(
      JSON.stringify({ message: "Invalid input values" }),
      { status: 400 }
    );
  }
  const { pickup_date, dropoff_date, ...rest } = inputValue;
  try {
    // Format dates
    const formattedPickupDate = formatDateTime(pickup_date);
    const formattedDropoffDate = formatDateTime(dropoff_date);
    const vendor = await prisma.vendors.create({
      data: {
        ...rest,
        amount: parseInt(inputValue.amount),
        pickup_date: formattedPickupDate,
        dropoff_date: formattedDropoffDate,
      },
    });
    if (vendor) {
      logger(
        userAgent,
        urlPath,
        "success",
        "POST",
        "Vendor created successfully"
      );
      return successResponse("success");
    } else {
      return errorResponse("Unable to create vendor", 500);
    }
  } catch (error) {
    logger(userAgent, urlPath, "failed", "POST", "Error creating vendor");
    return errorResponse("Error creating vendor", 500);
  }
};

export const GET = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    const response = await prisma.vendors.findMany();
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get all vendors");
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
    await prisma.vendors.update({
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
    input.organization_name &&
    input.client_name &&
    input.driver_name &&
    input.job_description &&
    input.pickup_location &&
    input.dropoff_location &&
    input.amount &&
    input.vehicle_type &&
    input.vehicle_model &&
    input.pickup_date &&
    input.dropoff_date
  );
};
