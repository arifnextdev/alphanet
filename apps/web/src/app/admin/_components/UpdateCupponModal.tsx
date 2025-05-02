import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, PencilIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { useUpdateCupponMutation } from '@/lib/services/cuppons';

const UpdateCupponModal = ({ cuppon }: { cuppon: any }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    discountValue: cuppon.discount,
    status: cuppon.status,
    expiesAt: cuppon.expiresAt,
  });
  const [date, setDate] = useState<Date>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [updateCuppon, { isLoading, error, data }] = useUpdateCupponMutation();

  const handleSubmit = () => {
    //no change then return
    if (
      form.discountValue === cuppon.discount &&
      form.expiesAt === cuppon.expiesAt &&
      form.status === cuppon.status
    ) {
      return;
    }
    updateCuppon({
      id: cuppon.id,
      data: {
        status: form.status === cuppon.status ? undefined : form.status,
        discount: Number(form.discountValue),
        expiesAt: form.expiesAt === cuppon.expiesAt ? undefined : form.expiesAt,
      },
    });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Coupon</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Cuppon Status</Label>
              <Select
                defaultValue={cuppon.status}
                onValueChange={(v) => setForm({ ...form, status: v })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="EXPIRED">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Expires At</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-[240px] justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Discount Value</Label>
            <Input
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
            />
          </div>
          <Button className="w-full" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCupponModal;
