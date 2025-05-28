import Link from "next/link";
import { FaPenFancy, FaRegClock } from "react-icons/fa";

export default function QuizCard({ test }) {
  return (
    <Link href={`/Instructionpage/${test}`}>
      <div className="flex flex-col items-center justify-center gap-2 cursor-pointer bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-sm hover:scale-105 transition-transform duration-200">
        <FaPenFancy className="text-black text-2xl sm:text-3xl" />
        <h2 className="text-green-700 font-bold text-xl sm:text-2xl capitalize text-center">
          {test}
        </h2>
        <div className="text-gray-700 text-sm sm:text-base mt-1">
          20 Questions
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-gray-600 text-sm sm:text-base">
          <FaRegClock className="text-base sm:text-lg" />
          <span>30 min</span>
        </div>
      </div>
    </Link>
  );
}
