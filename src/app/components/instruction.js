"use client";
import { useRouter } from "next/navigation";

const Instruction = ({ test }) => {
  const router = useRouter();
  const displayName = test;

  const handleClick = () => {
    const encoded = encodeURIComponent(displayName.toLowerCase());
    router.push(`/Allmocks/${encoded}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Content outside the card (top) */}
      <div className="mb-6 text-center text-gray-700">
        <p className="text-lg font-medium">You are about to start the <span className="text-green-700 font-semibold">{test}</span> quiz.</p>
        <p className="text-sm text-gray-600">Please read the instructions carefully before starting.</p>
      </div>

      {/* Main white box */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl w-full">
        <h1 className="text-2xl font-semibold">{test}</h1>
        <h2 className="text-lg font-semibold text-green-700 mb-4">Instructions:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>
            <span className="text-green-600">This is a </span>
            <span className="text-red-500 font-bold">FREE</span>
            <span className="text-green-600"> online test. Beware of scammers who ask for money to attend this test.</span>
          </li>
          <li><span className="font-medium">Total number of questions:</span> <strong>30</strong>.</li>
          <li><span className="font-medium">Time allotted:</span> <strong>30 minutes</strong>.</li>
          <li>Each question carries 1 mark; there are no negative marks.</li>
          <li className="text-red-600 font-semibold">DO NOT refresh the page.</li>
          <li>All the best!</li>
        </ul>
        <div className="mt-6 flex justify-center">
          <button onClick={handleClick} className="border border-green-600 text-green-700 px-4 py-2 rounded hover:bg-green-50 transition">
            Start Test
          </button>
        </div>
      </div>

      {/* Content outside the card (bottom) */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>If you face any issue, please contact support.</p>
      </div>
    </div>
  );
};

export default Instruction;
