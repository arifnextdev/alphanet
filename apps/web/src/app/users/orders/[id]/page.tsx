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
import { useGetOrderByIdQuery } from '@/lib/services/ordersApi';
import { EyeIcon, PencilIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

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
    <div className="space-y-6">
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
                payments.map((payment: any) => (
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
                        <Link href={`/admin/orders/invoice/${payment.id}`}>
                          <EyeIcon className="w-4 h-4 mr-2" />
                        </Link>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Update Payment</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              <Select defaultValue={payment.status}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PAID">PAID</SelectItem>
                                  <SelectItem value="DUE">DUE</SelectItem>
                                  <SelectItem value="CANCELLED">
                                    CANCELLED
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </DialogDescription>
                          </DialogContent>
                        </Dialog>
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
