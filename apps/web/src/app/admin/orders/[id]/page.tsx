'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction, useGetOrderByIdQuery, useTogglePaymentStatusMutation } from '@/lib/services/ordersApi';
import { format } from 'date-fns';
import { EyeIcon, PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const PAYMENT_STATUS_OPTIONS = [
  'PENDING',
  'DUE',
  'SUCCESS',
  'FAILED',
  'CANCELLED',
  'REFUNDED',
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: order, isLoading: loading } = useGetOrderByIdQuery(
    id as string,
  );
  const [togglePaymentStatus, { isLoading }] = useTogglePaymentStatusMutation();

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  const { domainName, amount, paidAt, expiresAt, status, product, payments } =
    order;

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
                payments.map((payment: Transaction) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id.slice(0, 6)}...</TableCell>
                    <TableCell>{payment.method || '—'}</TableCell>
                    <TableCell>
                      {payment.status === 'PENDING' && (
                        <Badge className="bg-yellow-600 text-white">
                          Pending
                        </Badge>
                      )}
                      {payment.status === 'DUE' && (
                        <Badge className="bg-orange-500 text-white">Due</Badge>
                      )}
                      {payment.status === 'SUCCESS' && (
                        <Badge className="bg-green-600 text-white">
                          Success
                        </Badge>
                      )}
                      {payment.status === 'FAILED' && (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                      {payment.status === 'CANCELLED' && (
                        <Badge className="bg-red-500 text-white">
                          Cancelled
                        </Badge>
                      )}
                      {payment.status === 'REFUNDED' && (
                        <Badge className="bg-indigo-600 text-white">
                          Refunded
                        </Badge>
                      )}
                      {!PAYMENT_STATUS_OPTIONS.includes(payment.status) && (
                        <Badge variant="outline">{payment.status}</Badge>
                      )}
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
                            <Button
                              variant="outline"
                              size="icon"
                              disabled={isLoading}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Update Payment Status</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="flex flex-wrap gap-2 mt-2">
                              
                                {PAYMENT_STATUS_OPTIONS.map((option) => (
                                  <Button
                                    key={option}
                                    variant={
                                      option === payment.status
                                        ? 'default'
                                        : 'outline'
                                    }
                                    disabled={isLoading || option === payment.status}
                                    onClick={async () => {
                                      try {
                                        await togglePaymentStatus({
                                          id: payment.id,
                                          status: option,
                                        }).unwrap();
                                        toast.success(
                                          `Payment status updated to ${option}`,
                                        );
                                      } catch (error) {
                                        toast.error('Failed to update payment status');
                                      }
                                    }}
                                  >
                                    {option}
                                  </Button>
                                ))}
                            
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
