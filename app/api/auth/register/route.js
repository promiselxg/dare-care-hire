import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/dbConnect";

export const POST = async (req) => {
  try {
    const { username, password, roles, confirm_password } = await req.json();

    // Validate required fields
    if (!username || !roles) {
      return NextResponse.json(
        { message: "Please fill out the required fields!" },
        { status: 400 }
      );
    }

    // Validate password confirmation
    if (password !== confirm_password) {
      return NextResponse.json(
        { message: "Password Mismatch!" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const userExist = await prisma.registeredUser.findUnique({
      where: { username },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "Username already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Parse roles and check if user is admin
    const parsedRoles = roles.map((r) => parseInt(r));
    const isAdmin = parsedRoles.includes(2200);

    // Create new user
    const user = await prisma.registeredUser.create({
      data: {
        username: username.toLowerCase(),
        password: hashedPassword,
        role: parsedRoles,
        admin: isAdmin,
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "Registration successful.", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", error: error.message },
      { status: 500 }
    );
  }
};
