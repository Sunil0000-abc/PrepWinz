'use client';

import React from "react";
import Instruction from "@/app/components/instruction";
import { useParams } from "next/navigation";

export default function Inst() {
  const params = useParams();
  const test = decodeURIComponent(params.test); // ✅ decode the test name

  return (
    <div>
      <Instruction test={test} />
    </div>
  );
}
