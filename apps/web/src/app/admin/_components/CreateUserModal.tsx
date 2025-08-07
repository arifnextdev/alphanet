'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCreateUserMutation } from '@/lib/services/usersApi';
import { toast } from 'sonner';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  roles: string[];
}

export default function CreateUserModal() {
  const [formData, setFormData] = useState<ICreateUser>({
    name: '',
    email: '',
    password: '',
    phone: '',
    roles: [],
  });

  const [open, setOpen] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const roles = checked
        ? [...prev.roles, value]
        : prev.roles.filter((role) => role !== value);
      return { ...prev, roles };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(formData)
      .unwrap()
      .then(() => {
        toast.success('User created successfully');
      })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('An unknown error occurred');
        }
      });
    setOpen(false);
    // submit formData to API here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Roles</Label>
            <div className="flex gap-4 mt-2">
              {['ADMIN', 'MODERATOR', 'CUSTOMER'].map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={role}
                    value={role}
                    checked={formData.roles.includes(role)}
                    onChange={handleRolesChange}
                    className="border border-gray-300 rounded"
                  />
                  <Label htmlFor={role} className="capitalize">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
