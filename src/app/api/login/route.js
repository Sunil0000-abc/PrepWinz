import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";
import bcrypt from "bcrypt"

export async function POST(req) {
  try{
    const {email , password } = await req.json();

    await connectDB();

    const user =await User.findOne({email});

    if(!user){
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        message:"Login successful",
        user:{
          user:user.name,
          email:user.email,
          admin:user.isadmin,
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  }catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
