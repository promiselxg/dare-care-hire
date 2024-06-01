import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateCookieResponse } from "@/utils/authUtils";
import prisma from "@/utils/dbConnect";

export const POST = async (req) => {
  const { username, password } = await req.json();

  //  check user credentials
  if (!username || !password) {
    return new NextResponse(
      JSON.stringify(
        { message: "Please enter your username or password." },
        { status: 400 }
      )
    );
  }
  const user = await await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const roles = Object.values(user.role);
    const token = await generateCookieResponse(
      user.id,
      roles,
      user.admin,
      username
    );
    return new NextResponse(
      JSON.stringify(
        {
          message: "Login Successful",
          userInfo: { token, id: user.id, isAdmin: user.admin, username },
        },
        { status: 400 }
      )
    );
  } else {
    return new NextResponse(
      JSON.stringify(
        { message: "Incorrect username or password." },
        { status: 400 }
      )
    );
  }
};

export const PUT = async (req) => {
  const { confirm_password, password, username, password1 } = await req.json();

  //  check user credentials
  if (!confirm_password || !password || !username || !password1) {
    return new NextResponse(
      JSON.stringify({ message: "Please fill out the form." }, { status: 400 })
    );
  }
  //  confirm if passwords match
  if (confirm_password !== password1) {
    return new NextResponse(
      JSON.stringify({ message: "Password Mismatch." }, { status: 400 })
    );
  }
  //  check if logged in user exist
  const userExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userExist) {
    return new NextResponse(
      JSON.stringify(
        { message: "Error occured, try again later." },
        { status: 400 }
      )
    );
  }
  //  compare user password with db password
  if (!(await bcrypt.compare(password, userExist?.password))) {
    return new NextResponse(
      JSON.stringify({ message: "Password Mismatch." }, { status: 403 })
    );
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(confirm_password, salt);
  //  update DB
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
};
