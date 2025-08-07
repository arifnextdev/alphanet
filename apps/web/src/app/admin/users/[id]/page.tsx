import CustomerProfile from '@/app/users/_components/Profile';
import React from 'react';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <CustomerProfile id={id} />
    </div>
  );
};

export default page;
