import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

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
    return new NextResponse(JSON.stringify(response, { status: 200 }));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
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
