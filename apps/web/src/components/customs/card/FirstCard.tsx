import { Button } from '@/components/ui/button';
import { Server } from 'lucide-react';
import Link from 'next/link';

const FirstCard = () => {
  return (
    <div className="w-full bg-gradient-to-bl from-primary/20 to-secondary/5 border border-primary/20 p-6 rounded-2xl  text-white hover:border-primary/60 group space-y-3 z10 duration-300 ease-in-out cursor-pointer ">
      {/* Profile */}
      <div className="flex flex-col gap-2  group-hover:border-primary">
        <Server size={30} />
        <div>
          <h2 className="text-base font-semibold text-white">
            Dedicated Server
          </h2>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gradient-to-r from-primary/70 via-transparent to-transparent group-hover:to-primary group-hover:via-primary duration-300 ease-in-out"></div>

      <div className="">
        <ol className="ordered list-disc pl-5 text-secondary/80 tracking-wide font-medium space-y-2">
          <li>
            <Link
              href={`#`}
              className="border-b border-transparent hover:border-b-primary transition ease-linear duration-200 cursor-pointer"
            >
              Dedicated Server in BD
            </Link>
          </li>
          <li>
            <Link
              href={`#`}
              className="border-b border-transparent hover:border-b-primary transition ease-linear duration-200 cursor-pointer"
            >
              Dedicated Server in USA
            </Link>
          </li>
          <li>
            <Link
              href={`#`}
              className="border-b border-transparent hover:border-b-primary transition ease-linear duration-200 cursor-pointer"
            >
              Windows Dedicated Server
            </Link>
          </li>
          <li>
            <Link
              href={`#`}
              className="border-b border-transparent hover:border-b-primary transition ease-linear duration-200 cursor-pointer"
            >
              Linux Dedicated Server
            </Link>
          </li>
        </ol>
      </div>
      <div className="">
        <Button
          variant="ghost"
          className="border border-primary/20 cursor-pointer text-primary hover:bg-primary hover:text-white"
        >
          {' '}
          Read More
        </Button>
      </div>
    </div>
  );
};

export default FirstCard;
