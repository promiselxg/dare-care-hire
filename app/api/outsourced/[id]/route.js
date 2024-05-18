import { errorResponse, successResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  if (!isIdValid(params)) {
    return errorResponse("Invalid Request ID", 200);
  }
  try {
    const deleteItem = await prisma.outsourcedDriver.delete({
      where: { id: params.id },
    });
    if (deleteItem) {
      logger(
        userAgent,
        urlPath,
        "success",
        "DELETE",
        `${params.id} deleted successfully`
      );
      return successResponse("Record deleted successfully", 200);
    }
  } catch (error) {
    console.log(error);
    logger(
      userAgent,
      urlPath,
      "failed",
      "DELETE",
      `error occured while trying to delete the item with ID: ${params.id}`
    );
    return errorResponse(
      "An error occurred while trying to delete this item.",
      200
    );
  }
};

export const GET = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    //    check if a record exist with the slug
    const itemExist = await prisma.outsourcedDriver.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!itemExist) {
      logger(userAgent, urlPath, "failed", "GET", "Invalid vehicle ID");
      return errorResponse("No Record found with the ID Provided", 500);
    }
    console.log(itemExist);
    return new NextResponse(JSON.stringify(itemExist, { status: 200 }));
  } catch (err) {
    console.log(err);
    logger(
      userAgent,
      urlPath,
      "failed",
      "GET",
      `error occured while trying to query DB with ${params.id}`
    );
    return errorResponse("Something went wrong", 500);
  }
};
const isIdValid = (params) => {
  return params.id;
};
