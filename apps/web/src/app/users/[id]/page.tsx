import React from 'react';
import CustomerProfile from '../_components/Profile';

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return (
    <div>
      <CustomerProfile id={id} />
    </div>
  );
};

export default page;
