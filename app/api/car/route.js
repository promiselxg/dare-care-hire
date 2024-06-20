import { removeUploadedImage } from "@/utils/cloudinary";
import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { generateSlug } from "@/utils/generateSlug";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];

  try {
    const body = await req.json();
    const photoId = body?.photos.map((url) => url.public_id.split("/")[1]);

    if (!isValidRequestBody(body)) {
      removeUploadedImage(photoId, "dareCareHireImages");
      return errorResponse("Please fill out the required fields.", 400);
    }

    const slug = body.slug;
    const recordExist = await prisma.vehicleInfo.findUnique({
      where: { slug },
    });
    if (recordExist) {
      removeUploadedImage(photoId, "dareCareHireImages");
      return errorResponse("A Vehicle with this name already exist.", 400);
    }
    const vehicleData = getVehicleDataFromRequestBody(body);
    const response = await prisma.vehicleInfo.create({ data: vehicleData });

    if (response) {
      logger(userAgent, urlPath, "success", "POST", "add vehicle");
      return successResponse("success");
    }
  } catch (error) {
    removeUploadedImage(photoId, "dareCareHireImages");
    logger(userAgent, urlPath, "failed", "POST", "add vehicle");
    return errorResponse("Something went wrong!", 500);
  }
};

const isValidRequestBody = (body) => {
  return (
    body.values.vehicle_name &&
    body.values.description &&
    body.values.vehicle_type &&
    body.values.vehicle_model &&
    body.slug
  );
};

const getVehicleDataFromRequestBody = (body) => {
  return {
    vehicle_name: body.values.vehicle_name,
    slug: body.slug,
    description: body.values.description,
    features: body.values.features,
    model: body.values.vehicle_model,
    amount: parseInt(0),
    imgUrl: body.photos.map((url) => url.secure_url),
    imageId: body.photos.map((url) => url.public_id.split("/")[1]),
    imgThumbnail: body.photos[0].secure_url,
    vehicle_type: body.values.vehicle_type,
  };
};

export const GET = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    const response = await prisma.vehicleInfo.findMany({
      select: {
        id: true,
        vehicle_name: true,
        description: true,
        imgThumbnail: true,
        vehicle_type: true,
        amount: true,
        slug: true,
        features: true,
        imageId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get all vehicles");
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
    return errorResponse("Please fill out the form.");
  }
  try {
    const updateData = {};
    if (body.field === "vehicle_name") {
      updateData[body.field] = body.value;
      updateData.slug = generateSlug(body.value);
    } else if (body.field === "image") {
      updateData.imgUrl = body.photos.map((url) => url.secure_url);
      updateData.imageId = body.photos.map(
        (url) => url.public_id.split("/")[1]
      );
      updateData.imgThumbnail = body.photos[0].secure_url;
      removeUploadedImage(body.value, "dareCareHireImages");
    } else {
      updateData[body.field] = body.value;
    }

    await prisma.vehicleInfo.update({
      where: { id: body?.id },
      data: updateData,
    });

    logger(userAgent, urlPath, "success", "PUT", "Update vehicle information");
    return successResponse("success");
  } catch (error) {
    logger(userAgent, urlPath, "failed", "PUT", "Update vehicle information");
    console.log(error);
    return errorResponse("Error occurred", 500);
  }
};
