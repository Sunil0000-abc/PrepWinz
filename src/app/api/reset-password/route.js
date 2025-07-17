import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/model/auth/user"
import bcrypt from "bcrypt"

export async function POST(req){
    const {token, otp , newPassword} = await req.json();

    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if(decode.otp != otp){
            return Response.json({message:"Invalid OTP"},{status:400});
        }

        await connectDB();

        const hashedPassword = await bcrypt.hash(newPassword,10);

        await User.findOneAndUpdate(
            {email:decode.email},
            {password:hashedPassword},
        );
        return Response.json({ message: "Password reset successful" });

    }catch (err) {
    return Response.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}