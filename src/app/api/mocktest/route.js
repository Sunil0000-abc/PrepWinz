import { connectDB } from "@/lib/db";
import { Product } from "@/lib/model/mock/data";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  let success = true;
  try {
    await connectDB(); // ✅ Correct way to connect
    data = await Product.find();
   
  } catch (err) {
    data = {result:"error"}
    success=false
  }
  return NextResponse.json({result:data},{success})
}
