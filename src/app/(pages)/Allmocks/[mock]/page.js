'use client';

import Mock from '@/app/components/mock';
import { useParams } from 'next/navigation';

const Mocktest = () => {
  const params = useParams();
  const test = decodeURIComponent(params.mock); // decode the dynamic segment
  
  return (
    <div>
      <Mock prop={test} />
    </div>
  );
};

export default Mocktest;
