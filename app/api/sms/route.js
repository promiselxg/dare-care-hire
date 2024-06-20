import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const phone = `234${body?.phone.substring(1)}`;
    const data = {
      to: phone,
      from: "Rofad91",
      sms: `Hi, ${body.first_name} your Vehicle Reservation ID is ${body.ID}`,
      type: "plain",
      api_key: process.env.TERMII_API_KEY,
      channel: "generic",
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    const smsResponse = await axios.post(
      "https://api.ng.termii.com/api/sms/send",
      data,
      axiosConfig
    );

    return new NextResponse(JSON.stringify(smsResponse.data.message), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify("Something went wrong."), {
      status: 500,
    });
  }
};
