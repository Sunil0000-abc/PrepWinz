import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { otp: userOtp } = await req.json();

    const authHeader = req.headers.get("authorization");
    const token = authHeader && authHeader.split(" ")[1]; // ✅ fixed

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { message: "OTP expired or invalid token", error: err.message },
        { status: 401 }
      );
    }

    if (decoded.otp != userOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    await connectDB();

    await User.findOneAndUpdate(
      { email: decoded.email },
      { isVerified: true } // ✅ field name must match your schema
    );

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}
