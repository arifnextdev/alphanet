'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function CreateCouponModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  const [form, setForm] = useState({
    code: '',
    discountType: 'PERCENTAGE',
    discountValue: '',
    expiresAt: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Creating coupon:', form);
    setOpen(false);
    setForm({ code: '', discountType: 'PERCENTAGE', discountValue: '', expiresAt: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Code</Label>
            <Input name="code" value={form.code} onChange={handleChange} />
          </div>
          <div>
            <Label>Discount Type</Label>
            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed</option>
            </select>
          </div>
          <div>
            <Label>Discount Value</Label>
            <Input
              type="number"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Expires At</Label>
            <Input
              type="date"
              name="expiresAt"
              value={form.expiresAt}
              onChange={handleChange}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
