import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";
export const GET = async (req) => {
  try {
    const response = await prisma.registeredUser.findMany({
      select: {
        id: true,
        username: true,
        createdAt: true,
        admin: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const jsonResponse = JSON.stringify(response);

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    };

    return new NextResponse(jsonResponse, {
      status: 200,
      headers,
    });
  } catch (err) {
    const errorResponse = JSON.stringify({ message: "Something went wrong!" });

    const headers = {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    };

    return new NextResponse(errorResponse, {
      status: 500,
      headers,
    });
  }
};

// const updateRoles = async (users) => {
//   return users.map((user) => {
//     const updatedRoles = user.role.map(
//       (roleId) => roleMapping[roleId] || roleId
//     );
//     return { ...user, role: updatedRoles };
//   });
// };

// const roleMapping = {
//   1500: "Moderator",
//   2200: "Administrator",
// };
