import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";

export const DELETE = async (req, { params }) => {
  if (!isIdValid(params)) {
    return errorResponse("Invalid Request ID", 200);
  }

  try {
    const dbResponse = await prisma.reservationInfo.findUnique({
      where: { id: params.id },
    });

    if (!dbResponse) {
      return errorResponse("Record not found", 404);
    }

    await prisma.reservationInfo.delete({
      where: { id: params.id },
    });

    return successResponse("Record deleted successfully", 200);
  } catch (error) {
    console.error(error);
    return errorResponse(
      "An error occurred while trying to delete this item.",
      500
    );
  } finally {
    await prisma.$disconnect();
  }
};

const isIdValid = (params) => {
  return params.id;
};
