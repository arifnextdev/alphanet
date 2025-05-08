'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '@/lib/services/auth';
import { Facebook, GithubIcon, PiIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    // Example: http://localhost:3000/auth/google
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook`;
    // Example: http://localhost:3000/auth/facebook
  };

  const [login, { isLoading, error, data }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(form);
    if (res.error) {
      toast('Invalid email or password', {
        style: {
          border: '1px solid #ef4444',
          background: '#fee2e2',
          color: '#ef4444',
        },
      });
    }
    if (res.data) {
      toast(`Logged in successfully`, );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-6 bg-zinc-900 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            className="bg-zinc-800 text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            type="password"
            placeholder="Password"
            className="bg-zinc-800 text-white"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleLogin}
          >
            <PiIcon className="text-xl" />
          </Button>
          <Button
            onClick={handleFacebookLogin}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <Facebook className="text-xl" /> Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Dont have an account?
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
