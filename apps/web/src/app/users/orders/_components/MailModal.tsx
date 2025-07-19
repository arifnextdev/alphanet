'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const MailModal = ({ id }: { id?: string }) => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('Order Confirmation');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description) {
      toast.error('Please fill out both fields');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          description,
          subject: subject || 'Order Confirmation',
          userId: id, // Replace with actual user ID if available
        }),
      });

      if (!res.ok) toast.error('Something went wrong');

      toast.success('Email sent successfully', {
        duration: 2000,
      });
      setEmail('');
      setDescription('');
      setSubject('Order Confirmation');
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="outline" className="cursor-pointer">
          Email
        </Badge>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Send email</DialogTitle>
            <DialogDescription>
              Send an email to the customer with the order details or any other
              information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the email content here..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Mail'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MailModal;
