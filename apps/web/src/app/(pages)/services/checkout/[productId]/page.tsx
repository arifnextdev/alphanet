'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateOrderMutation } from '@/lib/services/ordersApi';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import { useGetProductByIdQuery } from '@/lib/services/productsApi';

export default function CheckoutPage() {
  const [domainName, setDomainName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const { data: product, isLoading: isLoadingProduct } = useGetProductByIdQuery(
    productId,
    { skip: !productId },
  );

  const authUser = useSelector((state: RootState) => state.auth.user);

  const [createOrder, { isLoading: isLoadingOrder }] = useCreateOrderMutation();

  const calculateSummary = () => {
    if (!product) return null;

    const price = product.price;
    const discountRate = product.discount || 0;
    const taxRate = product.tax || 0;
    const vatRate = product.vat || 0;

    const discountAmount = (price * discountRate) / 100;
    const discountedPrice = price - discountAmount;

    const taxAmount = (discountedPrice * taxRate) / 100;
    const vatAmount = (discountedPrice * vatRate) / 100;

    const total = discountedPrice + taxAmount + vatAmount;

    return {
      price,
      discount: discountAmount,
      tax: taxAmount,
      vat: vatAmount,
      total,
    };
  };

  const priceSummary = calculateSummary();

  const isValidDomain = (name: string) =>
    /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(name);

  const handleCreateOrder = () => {
    if (authUser) {
      toast.promise(
        createOrder({
          productId: productId as string,
          userId: authUser.id,
          domainName,
          paymentMethod,
        })
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res?.bkashURL) {
              router.push(res?.bkashURL);
            } else {
              toast.success('Order placed successfully!');
            }
          }),
        {
          loading: 'Placing your order...',
          success: 'Order created successfully!',
          error: 'Failed to create order.',
        },
      );
    } else {
      router.push('/auth/login');
    }
  };

  if (isLoadingProduct) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input value={product.name} readOnly disabled />
            </div>
            {(product.type === 'HOSTING' || product.type === 'DOMAIN') && (
              <div className="space-y-2">
                <Label htmlFor="domainName">Domain Name</Label>
                <Input
                  id="domainName"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  placeholder="e.g. mycooldomain.com"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div
                  className={`border rounded-lg p-2 text-center cursor-pointer h-[100px] w-full overflow-hidden ${
                    paymentMethod === 'BIKASH' ? 'border-primary' : ''
                  }`}
                  onClick={() => setPaymentMethod('BIKASH')}
                >
                  <Image
                    src={'/images/vps/image.png'}
                    alt="bKash"
                    width={80}
                    height={40}
                    className=" w-full h-full object-cover z-10 bg-white rounded-xl"
                  />
                </div>
                <div
                  className={`border rounded-lg p-2 text-center cursor-pointer h-[100px] w-full overflow-hidden ${
                    paymentMethod === 'NAGAD' ? 'border-primary' : ''
                  }`}
                  onClick={() => setPaymentMethod('NAGAD')}
                >
                  <Image
                    src="/images/vps/nagad.png"
                    alt="Nagad"
                    width={80}
                    height={40}
                    className="mx-auto w-full h-full object-cover z-10 bg-white rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment Summary</h2>
          {priceSummary && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <tbody className="[&>tr:nth-child(even)]:bg-muted/50">
                  <tr>
                    <td className="py-2 px-4 font-medium">Price</td>
                    <td className="py-2 px-4">
                      {priceSummary.price.toFixed(2)} BDT
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">Discount</td>
                    <td className="py-2 px-4">
                      -{priceSummary.discount.toFixed(2)} BDT
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">VAT</td>
                    <td className="py-2 px-4">
                      +{priceSummary.vat.toFixed(2)} BDT
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">Tax</td>
                    <td className="py-2 px-4">
                      +{priceSummary.tax.toFixed(2)} BDT
                    </td>
                  </tr>
                  <tr className="border-t border-border font-bold text-base">
                    <td className="py-2 px-4">Grand Total</td>
                    <td className="py-2 px-4">
                      {priceSummary.total.toFixed(2)} BDT
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <Button
            disabled={Boolean(
              !paymentMethod ||
                ((product.type === 'HOSTING' || product.type === 'DOMAIN') &&
                  !domainName) ||
                isLoadingOrder ||
                (domainName && !isValidDomain(domainName)),
            )}
            onClick={handleCreateOrder}
            className="w-full mt-4"
          >
            {isLoadingOrder ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Place Order'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
