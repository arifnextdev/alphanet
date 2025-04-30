'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateOrderMutation } from '@/lib/services/ordersApi';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function OrderModalForm() {
  const [status, setStatus] = useState<string>('PENDING');
  const [amount, setAmount] = useState('');
  const [domainName, setDomainName] = useState('');

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleOrderAdd = () => {
    const orderData = {
      status,
      amount: parseFloat(amount),
      domainName,
    };

    createOrder(orderData);

    setStatus('PENDING');
    setAmount('');
    setDomainName('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[780px]">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>
            Fill in the order details and save to create a new order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domainName" className="text-right">
              Domain Name (Optional)
            </Label>
            <Input
              id="domainName"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Date Inputs */}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleOrderAdd}
            disabled={isLoading || !amount || !status}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Add Order</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
