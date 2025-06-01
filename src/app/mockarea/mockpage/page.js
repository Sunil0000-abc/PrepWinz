import React from "react";
import Mocktile from "@/app/components/mocktiles";

const test = [
  { name: "Test 1" },
  { name: "Test 2" },
  { name: "Test 3" },
  { name: "Test 4" },
];

const page = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Start Your Quiz Journey
          </h1>
          <p className="text-gray-600 text-lg">
            Test your knowledge with a variety of questions tailored to
            challenge and improve your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {test.map((item, idx) => (
            <div
              key={idx}
              className="transition-transform transform hover:-translate-y-1 duration-200"
            >
              <Mocktile test={item.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
