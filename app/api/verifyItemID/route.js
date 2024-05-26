import prisma from "@/utils/dbConnect";
import { errorResponse } from "@/utils/errorMessage";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const cartItems = await req.json();
  const ids = cartItems.map((item) => item.id);

  try {
    // Query the database for items with the given IDs
    const itemsInDB = await prisma.vehicleInfo.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        amount: true,
      },
    });
    // Map the database items by their IDs for easy lookup
    const itemsInDBMap = itemsInDB.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});

    const result = cartItems.map((item) => {
      const dbItem = itemsInDBMap[item.id];
      return {
        ...item,
        existsInDB: !!dbItem,
        amountMatches: dbItem ? item.amount === dbItem.amount : false,
      };
    });
    return new NextResponse(JSON.stringify(result, { status: 200 }));
  } catch (error) {
    return errorResponse("Something went wrong!", 500);
  }
};
