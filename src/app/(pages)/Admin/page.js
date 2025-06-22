"use client";

import { useState, useEffect } from "react";

export default function AdminInsertQuestion() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    a: "",
    b: "",
    c: "",
    d: "",
    correct: "",
    solution: "",
    company: "",
  });

  // Check admin from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.isadmin === "yes") {
      setIsAdmin(true);
    }

    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL_ADDQUESTION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({
          name: "",
          a: "",
          b: "",
          c: "",
          d: "",
          company: "",
          correct: "",
          solution: "",
        });
      } else {
        alert("Failed to submit question.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting question.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-md border border-red-200">
    <h2 className="text-2xl font-bold text-red-600 mb-4">
      Unauthorized Access
    </h2>
    <p className="text-gray-700 mb-2">
      You are <span className="font-semibold">not authorized</span> to insert questions.
    </p>
    <p className="text-gray-600 mb-4">
      This feature is restricted to admin users only. Please log in with an authorized account to access this page.
    </p>

    <button
      onClick={() => window.location.href = "/Login"}
      className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-200"
    >
      Go to Login
    </button>

    <p className="text-sm text-gray-400 mt-6">
      If you believe this is a mistake, please contact the administrator.
    </p>
  </div>
</div>

    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-green-600">
          Insert New Question
        </h2>

        {/* Question Input */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Question</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter question"
          />
        </div>

        {/* Options a-d */}
        {["a", "b", "c", "d"].map((opt) => (
          <div key={opt} className="grid grid-cols-2">
            <label className="block mb-1 text-sm font-semibold">
              Option {opt.toUpperCase()}
            </label>
            <input
              type="text"
              name={opt}
              value={form[opt]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder={`Enter option ${opt.toUpperCase()}`}
            />
          </div>
        ))}

        {/* Correct Option */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Correct Option</label>
          <input
            type="text"
            name="correct"
            value={form.correct}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="e.g. a, b, c or d"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Company</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="e.g. Cognizant, Wipro"
          />
        </div>

        {/* Solution */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Solution</label>
          <textarea
            name="solution"
            value={form.solution}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
            placeholder="Enter detailed solution"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Question
        </button>

        {success && (
          <div className="text-green-600 font-medium text-center">
            ✅ Question added successfully!
          </div>
        )}
      </form>
    </div>
  );
}
