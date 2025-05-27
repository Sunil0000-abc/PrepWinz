import Quiztiles from "@/app/components/Quiztiles";
import Link from "next/link";
import React from "react";

const companies = [
  { name: "Accenture" },
  { name: "TCS" },
  { name: "Cognizant" },
  { name: "Wipro" },
  { name: "Google" },
  { name: "Microsoft" },
];

const Quizarea = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Choose a Company to solve questions
        </h1>
        <p className="text-gray-600 text-lg">
          Select your preferred company to take a customized quiz based on its
          questions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {companies.map((item, idx) => (
          <div
            key={idx}
            className="transition-transform transform hover:-translate-y-1 duration-200"
          >
            <Quiztiles comp={item.name} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center mt-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Ready to Test Your Knowledge?
        </h2>
        <p className="text-gray-600 max-w-md">
          Take our quick, fun quiz and see how much you know. Its free, and you
          might even learn something new!
        </p>
        <Link href="/mockarea/mockpage">
          <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-lg rounded-full shadow-lg hover:from-green-700 hover:to-emerald-600 transform hover:scale-105 transition duration-300 ease-in-out">
            Get Free Mock Tests
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Quizarea;
