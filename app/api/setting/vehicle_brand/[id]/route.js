import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
export const DELETE = async (req, { params }) => {
  if (!isIdValid(params)) {
    return errorResponse("Invalid Request ID", 200);
  }
  try {
    const deleteItem = await prisma.vehicleBrand.delete({
      where: { id: params.id },
    });
    if (deleteItem) {
      return successResponse("Record deleted successfully", 200);
    }
  } catch (error) {
    return errorResponse(
      "An error occurred while trying to delete this item.",
      200
    );
  }
};

const isIdValid = (params) => {
  return params.id;
};
