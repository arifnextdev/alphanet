'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>

        <form className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            className="bg-zinc-800 text-white"
          />
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
            Register
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
