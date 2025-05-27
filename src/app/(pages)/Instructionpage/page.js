'use client';

import React from "react";
import Instruction from "@/app/components/instruction";
import { useSearchParams } from "next/navigation"; // ✅ correct hook for App Router

const Inst = () => {
  const searchParams = useSearchParams();
  const test = searchParams.get("test"); // get `quiz` from query string
  console.log(test);
  

  return (
    <div>
      <Instruction test={test} />
    </div>
  );
};

export default Inst;
