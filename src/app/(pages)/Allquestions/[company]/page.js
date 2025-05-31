"use client";

import QuestionPage from "@/app/components/questions";
import { useParams } from "next/navigation";

const Company = () => {
  const params = useParams();
  const company = params.company;

  return (
    <div>
      <QuestionPage company={company} />
    </div>
  );
};

export default Company;
