import jwt from "jsonwebtoken";
import { sendOTPEmail } from "@/app/util/sendmail";
import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";
import { NextResponse } from "next/server"; // ✅ this is required

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Received email:", email);

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Sending mail...");

    await sendOTPEmail(email, otp);

    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    return NextResponse.json({ message: "OTP sent", token }, { status: 200 });

  } catch (err) {
    console.error("OTP Send Error:", err);
    return NextResponse.json(
      { message: "Failed to send OTP", error: err.message },
      { status: 500 }
    );
  }
}
