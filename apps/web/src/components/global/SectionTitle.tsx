import React from 'react';

const SectionTitle = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-secondary/70">{desc}</p>
    </div>
  );
};

export default SectionTitle;
