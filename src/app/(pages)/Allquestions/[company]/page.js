'use client';

import QuestionPage from '@/app/components/questions';
import { useParams } from 'next/navigation';

const Company = () => {
  const params = useParams();
  const company = params.company; // this gets the dynamic segment from [company]

  return (
    <div>
      <QuestionPage prop={company}/>
    </div>
  );
};

export default Company;
