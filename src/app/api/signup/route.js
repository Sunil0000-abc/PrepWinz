import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectDB();

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already registered!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create user with plain-text password (⚠️ not recommended)
    await User.create({ name, email, password });

    return new Response(JSON.stringify({ message: "Registered successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
