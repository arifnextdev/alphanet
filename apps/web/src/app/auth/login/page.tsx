'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GithubIcon, PiIcon } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>

        <form className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-zinc-800 text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-zinc-800 text-white"
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <hr className="flex-1 border-zinc-700" />
          <span className="text-zinc-500 text-sm">or continue with</span>
          <hr className="flex-1 border-zinc-700" />
        </div>

        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <PiIcon className="text-xl" /> Google
          </Button>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <GithubIcon className="text-xl" /> GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
