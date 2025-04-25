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

const orders = [
  {
    id: 'ord_001',
    user: { name: 'John Doe' },
    product: { name: 'Hosting Plan' },
    domainName: 'example.com',
    amount: 19.99,
    status: 'PAID',
    paidAt: new Date(),
    expiresAt: new Date('2025-12-01'),
  },
  {
    id: 'ord_002',
    user: { name: 'Jane Smith' },
    product: { name: 'Domain .com' },
    domainName: 'janesmith.dev',
    amount: 9.99,
    status: 'PENDING',
    paidAt: null,
    expiresAt: null,
  },
];

const format = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'PAID':
      return <Badge className="bg-green-600">Paid</Badge>;
    case 'PENDING':
      return <Badge variant="outline">Pending</Badge>;
    case 'FAILED':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid At</TableHead>
                <TableHead>Expires At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{order.product.name}</TableCell>
                  <TableCell>{order.domainName || '—'}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {order.paidAt ? format(order.paidAt) : '—'}
                  </TableCell>
                  <TableCell>
                    {order.expiresAt ? format(order.expiresAt) : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
