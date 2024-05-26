import prisma from "@/utils/dbConnect";
import { errorResponse } from "@/utils/errorMessage";
import host from "@/utils/host";
import { logger } from "@/utils/logger";
import {
  generateRandomString,
  referenceNumber,
} from "@/utils/randomStringGenerator";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const userAgent = req.headers.get("user-agent");
  const urlPath = req.headers.get("referer").split(host.host_url)[1];

  try {
    const reservationData = await addReservation(body);

    const createPromises = reservationData.map((data) =>
      prisma.reservationInfo.create({
        data: {
          transaction_id: data.transaction_id,
          reference_no: data.reference_no,
          reservation_no: data.reservation_no,
          transaction_date: new Date(),
          trip_purpose: data.trip_purpose,
          trip_type: data.trip_type,
          transaction_status: data.transaction_status,
          transaction_amount: data.transaction_amount,
          payment_method: data.payment_method,
          pickup_date: data.pickup_date,
          dropoff_date: data.dropoff_date,
          pickup_location: data.pickup_location,
          dropoff_location: data.dropoff_location,
          total_days: data.total_days,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          customer_phone: data.customer_phone,
          vehicle_info: {
            vehicle_id: data.vehicle_info.vehicle_id,
            vehicle_name: data.vehicle_info.vehicle_name,
            vehicle_img_url: data.vehicle_info.vehicle_img_url,
          },
          extra_resources: {
            police_escort: data.extra_resources.police_escort,
            child_seat: data.extra_resources.child_seat,
          },
        },
      })
    );

    const result = await Promise.all(createPromises);
    logger(userAgent, urlPath, "success", "POST", "Vehicle reservation");
    return new NextResponse(
      JSON.stringify({
        message: "Reservations created successfully:",
        transaction_id: result[0].transaction_id,
      }),
      { status: 200 }
    );
  } catch (error) {
    logger(userAgent, urlPath, "failed", "POST", "Vehicle reservation failed");
    return errorResponse("Error creating reservations:", 500);
  }
};

async function addReservation(cart) {
  const { values, subTotalWithExtraResource } = cart;
  const tID = generateRandomString(8);
  const reservationData = subTotalWithExtraResource.map((item) => ({
    transaction_id: tID,
    reference_no: referenceNumber(),
    reservation_no: generateRandomString(),
    trip_purpose: item.rideInfo.purpose,
    trip_type: item.rideInfo.trip_type,
    transaction_status: "PENDING",
    transaction_amount: item.subtotal,
    payment_method: values.payment_method,
    pickup_date: item.rideInfo.pickup_date,
    dropoff_date: item.rideInfo.dropoff_date,
    pickup_location: item.rideInfo.pickup_location,
    dropoff_location: item.rideInfo.dropoff_location,
    total_days: item.days,
    customer_name: `${values.first_name} ${values.last_name}`,
    customer_email: values.email_address,
    customer_phone: values.phone,
    vehicle_info: {
      vehicle_id: item.id,
      vehicle_name: item.vehicle_name,
      vehicle_img_url: item.imgUrl || "",
    },
    extra_resources: {
      police_escort: item.extra_resource.police_escort || "",
      child_seat: item.extra_resource.child_seat || "",
    },
  }));

  return reservationData;
}
