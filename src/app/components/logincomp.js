"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const toggleMode = () => {
    setError("");
    setStep(1);
    setResetMode(false);
    setIsSignUp((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (resetMode) {
      if (step === 1) {
        const res = await fetch("/api/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to send OTP");
          return;
        }
        setToken(data.token);
        setStep(2);
      } else if (step === 2) {
        const res = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp, newPassword, token }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Reset failed");
          return;
        }
        toast("Password reset successfully!");
        setResetMode(false);
        setStep(1);
        setFormData({ name: "", email: "", password: "" });
        setOtp("");
        setNewPassword("");
        setToken("");
      }
      return;
    }

    if (isSignUp && step === 1) {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      const otpRes = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) {
        setError(otpData.message || "Failed to send OTP");
        return;
      }
      setToken(otpData.token);
      setStep(2);
    } else if (isSignUp && step === 2) {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "OTP verification failed");
        return;
      }
      toast("Email verified! Please login.");
      setIsSignUp(false);
      setStep(1);
      setFormData({ name: "", email: "", password: "" });
      setOtp("");
      setToken("");
    } else {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("user-updated"));
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="light"
      />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          {resetMode
            ? step === 1
              ? "Reset Password"
              : "Enter OTP & New Password"
            : isSignUp
            ? step === 1
              ? "Create an Account"
              : "Verify OTP"
            : "Login to Your Account"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSignUp && step === 1 && (
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          {(step === 1 || resetMode) && (
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
          )}

          {!resetMode && step === 1 && (
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <label htmlFor="otp" className="block mb-1 text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="123456"
                  required
                />
              </div>
              {resetMode && (
                <div>
                  <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {resetMode
              ? step === 1
                ? "Send OTP"
                : "Reset Password"
              : isSignUp
              ? step === 1
                ? "Sign Up & Send OTP"
                : "Verify OTP"
              : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="text-center text-sm text-gray-500 mt-6 space-y-2">
          {!resetMode && (
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:underline font-medium"
              >
                {isSignUp ? "Login" : "Sign up"}
              </button>
            </p>
          )}
          {!isSignUp && !resetMode && (
            <p>
              <button
                onClick={() => {
                  setResetMode(true);
                  setStep(1);
                  setError("");
                }}
                className="text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </p>
          )}
          {resetMode && (
            <p>
              <button
                onClick={() => {
                  setResetMode(false);
                  setStep(1);
                }}
                className="text-gray-600 hover:underline font-medium"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
