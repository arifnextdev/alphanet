'use client';

import { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table } from '@/components/ui/table';
import {
  totalDiscount,
  totalSubTotal,
  totalTax,
  totalVat,
} from '@/lib/calculate';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useCreateOrderMutation } from '@/lib/services/ordersApi';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// Props: product (object), user (object)
export function OrderDialog({
  product,
  user,
  isPopular,
}: {
  product: any;
  user: any;
  isPopular: boolean;
}) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();

  const authUser = useSelector((state: RootState) => state.auth.user);

  const [createOrder, { isLoading: isLoadingOrder }] = useCreateOrderMutation();
  const handleCreateOrder = () => {
    if (authUser) {
      createOrder({ productId: product.id, userId: authUser?.id })
        .unwrap()
        .then((order) => {
          console.log(order);
          router.push(order?.bkashURL || '');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`w-full ${
            isPopular ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''
          }`}
          variant={isPopular ? 'default' : 'outline'}
        >
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Order</DialogTitle>
          <DialogDescription>
            Review your details and select payment method.
          </DialogDescription>
        </DialogHeader>

        {/* Product Info (read only) */}
        <div className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input value={product?.name} disabled readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bikash" id="bk" />
              <Label htmlFor="bk">Bkash</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nogod" id="ng" />
              <Label htmlFor="ng">Nagad</Label>
            </div>
          </RadioGroup>
        </div>

        <div className=" w-full">
          <h4 className="text-lg font-semibold mb-2 ">Payment Summary</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full  text-sm border border-border rounded-full">
              <tbody className="[&>tr:nth-child(even)]:bg-muted/50">
                <tr>
                  <td className="py-2 px-4 font-medium">Price</td>
                  <td className="py-2 px-4">{product?.price} BDT</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Discount</td>
                  <td className="py-2 px-4">
                    -{totalDiscount(product?.price, product?.discount)} BDT
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">VAT</td>
                  <td className="py-2 px-4">
                    +{totalVat(product?.price, product?.vat)} BDT
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">Tax</td>
                  <td className="py-2 px-4">
                    +{totalTax(product?.price, product?.tax)} BDT
                  </td>
                </tr>
                <tr className="border-t border-border font-bold text-base">
                  <td className="py-2 px-4">Grand Total</td>
                  <td className="py-2 px-4">
                    {totalSubTotal(
                      product?.price,
                      product?.discount,
                      product?.vat,
                      product?.tax,
                    )}{' '}
                    BDT
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit */}
        <DialogFooter>
          <Button disabled={!paymentMethod} onClick={handleCreateOrder}>
            {isLoadingOrder ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Place Order'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
