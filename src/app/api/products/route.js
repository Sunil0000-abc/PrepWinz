import { connectDB } from "@/lib/db";
import { Product } from "@/lib/model/Question/product";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await connectDB(); // way to connect with db
    data = await Product.find();
   
  } catch (err) {
    data = {result:"error"}
    success=false
    console.log(err);
    
  }
  return NextResponse.json({result:data},{success})
}



