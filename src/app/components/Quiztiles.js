"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GoGoal } from "react-icons/go";

const Quiztiles = ({ comp }) => {
  const router = useRouter();

  const displayName = comp;

  const handleClick = () => {
    const encoded = encodeURIComponent(displayName.toLowerCase());

    router.push(`/Allquestions/${encoded}`);
  };

  return (
    <div
      onClick={handleClick}
      className="
  flex items-center justify-center gap-2 cursor-pointer bg-white p-3 rounded-2xl shadow-lg w-full max-w-xs hover:scale-105 transition-transform duration-200
  md:gap-4 md:p-6 md:max-w-sm
"
    >
       <GoGoal className="text-black text-sm sm:text-lg" />
      <h2 className="text-green-700 font-bold text-sm capitalize sm:text-lg">
        {displayName}
      </h2>
    </div>
  );
};

export default Quiztiles;
