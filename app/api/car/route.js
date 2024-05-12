import { removeUploadedImage } from "@/utils/cloudinary";
import prisma from "@/utils/dbConnect";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(process.env.HOST_URL)[1];
  try {
    const body = await req.json();
    const photoId = body?.photos.map((url) => url.public_id.split("/")[1]);
    if (
      !body.values.vehicle_name ||
      !body.values.description ||
      !body.values.amount ||
      !body.values.vehicle_type ||
      !body.values.vehicle_model ||
      !body.slug
    ) {
      removeUploadedImage(photoId, "dareCareHireImages");
      return new NextResponse(
        JSON.stringify(
          { message: "Please fill out the required fields." },
          { status: 400 }
        )
      );
    }
    // check if record already exist
    const recordExist = await prisma.vehicleInfo.findUnique({
      where: {
        slug: body?.slug,
      },
    });
    if (recordExist) {
      removeUploadedImage(photoId, "dareCareHireImages");
      return new NextResponse(
        JSON.stringify(
          { message: "A Vehicle with this name already exist." },
          { status: 400 }
        )
      );
    }
    // insert document into DB
    const response = await prisma.vehicleInfo.create({
      data: {
        vehicle_name: body?.values?.vehicle_name,
        slug: body.slug,
        description: body?.values?.description,
        features: body?.values?.features,
        model: body?.values?.vehicle_model,
        amount: parseInt(body?.values?.amount),
        imgUrl: body?.photos?.map((url) => url.secure_url),
        imageId: body?.photos?.map((url) => url.public_id.split("/")[1]),
        vehicle_type: body?.values?.vehicle_type,
      },
    });
    if (response) {
      logger(userAgent, urlPath, "success", "POST", "add vehicle");
      return new NextResponse(
        JSON.stringify({ message: "success" }, { status: 200 })
      );
    }
  } catch (err) {
    removeUploadedImage(photoId, "dareCareHireImages");
    logger(userAgent, urlPath, "failed", "POST", "add vehicle");
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
