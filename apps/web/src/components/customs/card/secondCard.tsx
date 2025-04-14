import React from 'react';

const SecondCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <>
      <div className="group rounded-2xl border border-border bg-accent/10 p-6 shadow-sm transition hover:shadow-md hover:border-primary space-y-3 duration-300">
        <div className="text-4xl">
          <span className="">{icon}</span>
        </div>
        <div className="w-full h-[1px] bg-gradient-to-r from-primary/70 via-transparent to-transparent group-hover:to-primary group-hover:via-primary duration-300 ease-in-out"></div>
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="mt-2 text-sm text-secondary/70">{description}</p>
      </div>
    </>
  );
};

export default SecondCard;
