"use client";
import React, { useState } from "react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleMode = () => setIsSignUp((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form className="space-y-6">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-green-600 hover:underline font-medium"
          >
            {isSignUp ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
