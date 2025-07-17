import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";
import bcrypt from "bcryptjs"

export async function POST(req){
  try{
    const {name, email, password} = await req.json();

    if(!name || !email || !password) {
      return Response.json({message:"All fielde are required"},{status:400});
    }

    await connectDB();

    const existingUser = await User.findOne({email:email.trim()});

    if(existingUser){
      return Response.json({message:"user already exists"},{status:400});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email:email.trim(),
      password:hashedPassword,
    });

    await user.save();

    return Response.json({message:"user registered successfully"},{status:201});
  }catch(error){
    return Response.json({message:"Registration error" , error:error.message},
      {status:500},
    )
  }
}