import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/model/auth/user"
import { sendResetOTPEmail } from "@/app/util/sendResetOTPEmail"

export async function POST(req){
    const {email} = await req.json();

    await connectDB();

    const user = await User.findOne({email});

    if(!user){
        return Response.json({message:"User not found"},{status:404});
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const token = jwt.sign({email,otp},process.env.JWT_SECRET,{expiresIn:"10m"});

    try{
        await sendResetOTPEmail(email, otp);
        return Response.json({message:"OTP sent",token});
    }catch(err){
        return Response.json({ message: "Failed to send OTP", error: err.message }, { status: 500 });
    }
}