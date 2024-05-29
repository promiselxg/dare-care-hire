import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const body = await req.json();
  console.log(body);
  return new NextResponse(JSON.stringify("success"), { status: 200 });
};

export const DELETE = async (req, { params }) => {
  console.log(params);
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  if (!isIdValid(params)) {
    return errorResponse("Invalid Request ID", 200);
  }
  try {
    const deleteItem = await prisma.vehicleType.delete({
      where: { id: params.id },
    });
    if (deleteItem) {
      // logger(
      //   userAgent,
      //   urlPath,
      //   "success",
      //   "DELETE",
      //   `${params.id} deleted successfully`
      // );
      return successResponse("Record deleted successfully", 200);
    }
  } catch (error) {
    console.log(error);
    //   logger(
    //     userAgent,
    //     urlPath,
    //     "failed",
    //     "DELETE",
    //     `error occured while trying to delete the item with ID: ${params.id}`
    //   );
    return errorResponse(
      "An error occurred while trying to delete this item.",
      200
    );
  }
};

const isIdValid = (params) => {
  return params.id;
};
