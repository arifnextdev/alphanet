'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLoginMutation } from '@/lib/services/auth';
import { Facebook, GithubIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();

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

    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const data = await login(form).unwrap();
      toast.success('Logged in successfully');
      console.log('Login data:', data);
      router.push(`/oauth-callback?token=${data.accessToken}`);
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
      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl shadow-lg border border-secondary">
        <h2 className="text-3xl font-bold  text-center">Sign In</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className=""
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
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

        <p className="text-center text-sm ">
          Dont have an account?{' '}
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
