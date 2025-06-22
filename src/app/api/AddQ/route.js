import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/model/Question/product";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);
    
    const { name, a, b, c, d, correct, solution, company } = body;

    // ✅ Corrected: no extra comma
    if (
      [name, a, b, c, d, solution, company, correct].some((field) => !field)
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const question = new Product({
      name,
      a,
      b,
      c,
      d,
      correct,
      solution,
      company,
    });

    await question.save();

    return NextResponse.json({ message: "Question inserted" }, { status: 201 });
  } catch (err) {
    console.error("Insert error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
