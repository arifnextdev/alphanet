'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { IOrder, Transaction, useGetOrderByIdQuery } from '@/lib/services/ordersApi';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrder | null>(null);

  const { data, isLoading: loading } = useGetOrderByIdQuery(id as string);

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Order not found.</p>;

  const { domainName, amount, paidAt, expiresAt, status, product, payments } =
    order ?? data;

  return (
    <div className="space-y-6 mx-20 my-10">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <p>
              <strong>Domain:</strong> {domainName}
            </p>
            <p>
              <strong>Status:</strong> <Badge>{status}</Badge>
            </p>
            <p>
              <strong>Amount:</strong> ${amount}
            </p>
            <p>
              <strong>Paid At:</strong>{' '}
              {paidAt ? format(new Date(paidAt), 'PPP') : '—'}
            </p>
            <p>
              <strong>Expires At:</strong>{' '}
              {expiresAt ? format(new Date(expiresAt), 'PPP') : '—'}
            </p>
            {product && (
              <>
                <p>
                  <strong>Product:</strong> {product.name}
                </p>
                <p>
                  <strong>Billing Cycle:</strong> {product.billingCycle}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Discount:</strong> ${product.discount}
                </p>
                <p>
                  {' '}
                  <strong>Tax:</strong> ${product.tax}
                </p>
                <p>
                  <strong>VAT:</strong> ${product.vat}
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>VAT</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Paid At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length > 0 ? (
                payments.map((payment: Transaction) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id.slice(0, 6)}...</TableCell>
                    <TableCell>{payment.method || '—'}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          payment.status === 'PAID'
                            ? 'bg-green-600 text-white'
                            : payment.status === 'DUE'
                              ? 'bg-yellow-600'
                              : 'bg-secondary-foreground'
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>${payment.discount}</TableCell>
                    <TableCell>${payment.tax}</TableCell>
                    <TableCell>${payment.vat}</TableCell>
                    <TableCell>${payment.subtotal}</TableCell>
                    <TableCell>
                      {payment.paidAt
                        ? format(new Date(payment.paidAt), 'PPP')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-5">
                        <Link href={`/users/orders/invoice/${payment.id}`}>
                          <EyeIcon className="w-4 h-4 mr-2" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center text-muted-foreground"
                  >
                    No payment history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}