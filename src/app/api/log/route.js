import { connectDB } from "@/lib/db";
import { User } from "@/lib/model/auth/user";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    await connectDB();

    const user = await User.findOne({ email, password }); // ❗ plaintext for simplicity

    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid email or password" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Include user's name in response
    return new Response(
      JSON.stringify({
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          isadmin:user.isadmin,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
