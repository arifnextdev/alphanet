'use client';

import Image from 'next/image';
import SectionTitle from '../global/SectionTitle';

const teamMembers = [
  {
    name: 'Md Ariful Islam',
    role: 'Full Stack Developer',
    avatar: '/avatars/arif.png',
  },
  {
    name: 'Sara Ali',
    role: 'UI/UX Designer',
    avatar: '/avatars/sara.png',
  },
  {
    name: 'Nayeem Rahman',
    role: 'Frontend Engineer',
    avatar: '/avatars/nayeem.png',
  },
];

const TeamMember = ({
  name,
  role,
  avatar,
}: {
  name: string;
  role: string;
  avatar: string;
}) => (
  <div className="flex flex-col items-center rounded-xl border border-border bg-muted/30 p-6 shadow-sm hover:bg-muted/40 transition">
    <Image
      src={avatar}
      alt={name}
      width={96}
      height={96}
      priority
      className="h-24 w-24 rounded-full object-cover border border-border"
    />
    <h4 className="mt-4 text-lg font-semibold text-primary">{name}</h4>
    <p className="text-sm text-secondary/60">{role}</p>
  </div>
);

const Team = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <SectionTitle
          title="Meet Our Team"
          desc="We are a team of passionate experts dedicated to turning your ideas into reality."
        />
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
