import prisma from "./dbConnect";

export async function logger(device_name, url, status, method, action) {
  try {
    await prisma.logger.create({
      data: {
        userAgent: device_name,
        urlPath: url,
        logStatus: status,
        method,
        action,
      },
    });
    ///if (response) console.log(response);
  } catch (error) {
    console.log(error);
  }
}
