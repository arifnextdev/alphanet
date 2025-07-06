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
import { useGetProductByIdQuery } from '@/lib/services/productsApi'; // <-- Update as needed
import { format } from 'date-fns';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductOrderHistoryPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id as string);

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  const { name, billingCycle, price, discount, tax, vat, orders } = product;

  return (
    <div className="space-y-6">
      {/* Product Info */}
      <Card>
        <CardHeader>
          <CardTitle>Product Info</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Billing Cycle:</strong> {billingCycle}
          </div>
          <div>
            <strong>Price:</strong> ${price}
          </div>
          <div>
            <strong>Discount:</strong> ${discount}
          </div>
          <div>
            <strong>Tax:</strong> ${tax}
          </div>
          <div>
            <strong>VAT:</strong> ${vat}
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid At</TableHead>
                <TableHead>Expires At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.length > 0 ? (
                orders.map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id.slice(0, 6)}...</TableCell>
                    <TableCell>{order.domainName}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          order.status === 'PAID'
                            ? 'bg-green-600 text-white'
                            : order.status === 'DUE'
                              ? 'bg-yellow-600'
                              : 'bg-secondary-foreground'
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>
                      {order.paidAt
                        ? format(new Date(order.paidAt), 'PPP')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      {order.expiresAt
                        ? format(new Date(order.expiresAt), 'PPP')
                        : '—'}
                    </TableCell>
                    <TableCell className="text-right flex justify-end items-center">
                      <span>
                        <Link className="" href={`/admin/orders/${order.id}`}>
                          <EyeIcon className="w-4 h-4" />
                        </Link>
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No order history found.
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
