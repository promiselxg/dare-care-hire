import { removeUploadedImage } from "@/utils/cloudinary";
import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const photoId = body?.photos.map((url) => url.public_id.split("/")[1]);
    if (
      !body.values.vehicle_name ||
      !body.values.description ||
      !body.values.amount ||
      !body.values.vehicle_type ||
      !body.values.vehicle_model ||
      body.slug
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
      return new NextResponse(
        JSON.stringify({ message: "success" }, { status: 200 })
      );
    }
  } catch (err) {
    removeUploadedImage(photoId, "dareCareHireImages");
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
