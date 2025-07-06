'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/services/auth'; // Make sure this exists
import Link from 'next/link';
import { Facebook, GithubIcon } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [register, { isLoading }] = useRegisterMutation();

  const handleOAuthLogin = (provider: 'google' | 'facebook') => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) {
      toast.error('Missing API URL configuration');
      return;
    }
    window.location.href = `${baseUrl}/auth/${provider}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error('All fields are required');
      return;
    }

    try {
      await register(form).unwrap();
      toast.success('Account created successfully');
      router.push('/auth/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6  p-8 rounded-2xl shadow-lg border border-secondary">
        <h2 className="text-3xl font-bold  text-center">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            className=" "
            value={form.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className=""
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className=" "
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <hr className="flex-1 " />
          <span className=" text-sm">or continue with</span>
          <hr className="flex-1 " />
        </div>

        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthLogin('google')}
          >
            <GithubIcon className="text-xl" /> Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleOAuthLogin('facebook')}
          >
            <Facebook className="text-xl" /> Facebook
          </Button>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
