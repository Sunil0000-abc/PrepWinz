"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

const Quiztiles = ({ comp}) => {
  const router = useRouter();

  const displayName = comp;

  const handleClick = () => {
   const encoded = encodeURIComponent(displayName.toLowerCase());
 
    router.push(`/Allquestions/${encoded}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-center gap-4 cursor-pointer bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm hover:scale-105 transition-transform duration-200"
    >
      <FaPlay className="text-black text-2xl" />
      <h2 className="text-green-700 font-bold text-2xl capitalize">
        {displayName}
      </h2>
    </div>
  );
};

export default Quiztiles;
