import prisma from "@/utils/dbConnect";
import { errorResponse, successResponse } from "@/utils/errorMessage";
import { formatDateWithoutTime } from "@/utils/getDateDifference";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const inputValue = await req.json();
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  try {
    if (!isInputValuesValid(inputValue)) {
      return errorResponse("Invalid input values", 400);
    }

    const phoneNumberExists = await prisma.driver.count({
      where: { phone_number: inputValue.phone_number },
    });

    if (phoneNumberExists > 0) {
      return errorResponse("Phone number already exists.", 409);
    }

    const driver = await prisma.driver.create({
      data: {
        ...inputValue,
        amount: parseInt(inputValue?.amount),
        date: formatDateWithoutTime(inputValue?.date),
      },
    });

    if (driver) {
      logger(
        userAgent,
        urlPath,
        "success",
        "POST",
        "New Driver Information created successfully"
      );
      return successResponse("success");
    } else {
      logger(userAgent, urlPath, "failed", "POST", "Error creating new driver");
      return errorResponse("Error creating new driver", 500);
    }
  } catch (error) {
    console.log(error);
    logger(userAgent, urlPath, "failed", "POST", "Error creating new driver");
    return errorResponse("Error creating new driver", 500);
  }
};

export const GET = async (req) => {
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];
  let query;
  const { accountType, date } = extractQueryParams(req?.url);

  if (!accountType && !date) {
    query = {};
  } else {
    query = {
      where: {
        AND: [{ account_type: accountType }, { date: date }],
      },
    };
  }
  try {
    const response = await prisma.driver.findMany(query, {
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    logger(userAgent, urlPath, "failed", "GET", "get all drivers");
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
    await prisma.driver.update({
      where: { id: body?.id },
      data: {
        [body.field]: body.value,
      },
    });
    logger(userAgent, urlPath, "success", "PUT", "Update Driver's information");
    return successResponse("success");
  } catch (error) {
    logger(
      userAgent,
      urlPath,
      "failed",
      "PUT",
      "Update Driver's information failed"
    );
    return errorResponse("Error occurred", 500);
  }
};

const isInputValuesValid = (input) => {
  return (
    input.driver_name &&
    input.address &&
    input.account_type &&
    input.amount &&
    input.phone_number
  );
};

function extractQueryParams(url) {
  const params = new URLSearchParams(url.split("?")[1]);
  return {
    accountType: params.get("account_type"),
    date: params.get("date"),
  };
}
