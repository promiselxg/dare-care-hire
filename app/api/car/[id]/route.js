import { removeUploadedImage } from "@/utils/cloudinary";
import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    //    check if a record exist with the slug
    const itemExist = await prisma.vehicleInfo.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!itemExist) {
      logger(userAgent, urlPath, "failed", "GET", "Invalid vehicle ID");
      return errorResponse("No Record found with the ID Provided", 500);
    }
    return new NextResponse(JSON.stringify(itemExist, { status: 200 }));
  } catch (err) {
    logger(
      userAgent,
      urlPath,
      "failed",
      "GET",
      `error occured while trying to query DB with ${params.id}`
    );
    return successResponse("Something went wrong!", 200);
  }
};
export const DELETE = async (req, { params }) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  if (!isIdValid(params)) {
    return errorResponse("Invalid Request ID", 200);
  }
  try {
    const vehicleInfo = await prisma.vehicleInfo.findUnique({
      where: { id: params.id },
    });
    removeUploadedImage(vehicleInfo.imageId, "dareCareHireImages");
    const deleteItem = await prisma.vehicleInfo.delete({
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

const isIdValid = (params) => {
  return params.id;
};
