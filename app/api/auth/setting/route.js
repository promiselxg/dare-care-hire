import prisma from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PUT = async (req) => {
  const {
    type,
    username,
    new_username,
    confirm_password,
    password1,
    password,
  } = await req.json();

  console.log(username);
  if (type === "password") {
    // Check user credentials
    if (!confirm_password || !password || !password1) {
      return new NextResponse(
        JSON.stringify(
          { message: "Please fill out the form." },
          { status: 400 }
        )
      );
    }
    // Confirm if passwords match
    if (confirm_password !== password1) {
      return new NextResponse(
        JSON.stringify({ message: "Password Mismatch." }, { status: 400 })
      );
    }
  } else if (type === "username") {
    // Check new username
    if (!new_username) {
      return new NextResponse(
        JSON.stringify(
          { message: "Please provide a new username." },
          { status: 400 }
        )
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "Invalid type provided." }, { status: 400 })
    );
  }

  // Check if logged in user exists
  const userExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userExist) {
    return new NextResponse(
      JSON.stringify({ message: "User not found." }, { status: 400 })
    );
  }

  // Compare user password with db password
  if (!(await bcrypt.compare(password, userExist?.password))) {
    return new NextResponse(
      JSON.stringify({ message: "Password Mismatch." }, { status: 403 })
    );
  }

  // Handle password update
  if (type === "password") {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(confirm_password, salt);
    // Update DB
    const updatedRecord = await prisma.user.update({
      where: { username },
      data: {
        password: hashedPassword,
      },
    });
    if (updatedRecord) {
      return new NextResponse(
        JSON.stringify({ message: "success" }, { status: 200 })
      );
    }
  }
  // Handle username update
  if (type === "username") {
    // Check if new username already exists
    const newUserExist = await prisma.user.findUnique({
      where: {
        username: new_username,
      },
    });

    if (newUserExist) {
      return new NextResponse(
        JSON.stringify({ message: "Username already taken." }, { status: 400 })
      );
    }

    // Update DB
    const updatedRecord = await prisma.user.update({
      where: { username },
      data: {
        username: new_username,
      },
    });

    if (updatedRecord) {
      return new NextResponse(
        JSON.stringify({ message: "success" }, { status: 200 })
      );
    }
  }
};
