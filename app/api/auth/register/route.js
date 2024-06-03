import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/dbConnect";

export const POST = async (req) => {
  try {
    let { username, password, roles, confirm_password } = await req.json();
    const role = [];

    roles.forEach((r) => {
      role.push(parseInt(r));
    });

    if (!username || !role) {
      return new NextResponse(
        JSON.stringify(
          { message: "Please fill out the required fields!" },
          { status: 500 }
        )
      );
    }

    if (password !== confirm_password) {
      return new NextResponse(
        JSON.stringify({ message: "Password Mismatch!" }, { status: 400 })
      );
    }

    const userExist = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (userExist) {
      return new NextResponse(
        JSON.stringify({ message: "Username  already exist." }, { status: 400 })
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isAdmin = role.includes(2200);

    const user = await prisma.user.create({
      data: {
        username: username?.toLowerCase(),
        password: hashedPassword,
        role,
        admin: isAdmin,
      },
    });

    if (user) {
      return new NextResponse(
        JSON.stringify(
          { message: "Registration successful.", user },
          { status: 200 }
        )
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Invalid Credentials." }, { status: 400 })
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }, { status: 401 })
    );
  }
};
