'use client';

import { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import {
  FilteredTransactionResponse,
  useGetFilterTransectionQuery,
} from '@/lib/services/ordersApi';

const dateRanges = [
  'today',
  'tomorrow',
  'last7days',
  'last15days',
  'last30days',
  'lastmonth',
];

const statuses = ['PENDING', 'PAID', 'FAILED'];

export default function TransactionDashboard() {
  const [dateRange, setDateRange] = useState('today');
  const [status, setStatus] = useState('all');
  const [details, setDetails] = useState<FilteredTransactionResponse | null>(
    null,
  );

  const { data, isLoading } = useGetFilterTransectionQuery({
    dateRange,
    status,
  });

  const transactions = details?.transactions || [];

  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data, status, dateRange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {statuses.map((stat) => (
              <SelectItem key={stat} value={stat}>
                {stat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <strong>Total Amount:</strong> $
            {data?.summary.totalAmount?.toFixed(2) || 0}
          </div>
          <div>
            <strong>Total Tax:</strong> $
            {data?.summary.totalTax?.toFixed(2) || 0}
          </div>
          <div>
            <strong>Total VAT:</strong> $
            {data?.summary.totalVat?.toFixed(2) || 0}
          </div>
          <div>
            <strong>Total Discount:</strong> $
            {data?.summary.totalDiscount?.toFixed(2) || 0}
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Sub Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Order Expiers At</TableHead>
                <TableHead>Last Paid At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell>{trx.order?.product.name || '—'}</TableCell>
                    <TableCell>{trx.order?.user?.name || '—'}</TableCell>
                    <TableCell>{trx.method || '—'}</TableCell>
                    <TableCell>${trx.amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>${trx.subtotal?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          trx.status === 'PAID'
                            ? 'bg-green-600'
                            : trx.status === 'FAILED'
                              ? 'bg-red-600'
                              : 'bg-yellow-600'
                        }
                      >
                        {trx.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {trx.createdAt
                        ? format(new Date(trx.createdAt), 'PPP')
                        : '—'}
                    </TableCell>

                    <TableCell>
                      {trx.order?.product.billingCycle || '—'}
                    </TableCell>
                    <TableCell>
                      {trx.order?.expiresAt
                        ? format(new Date(trx.order.expiresAt), 'PPP')
                        : '—'}
                    </TableCell>
                    <TableCell>
                      {trx.order?.paidAt
                        ? format(new Date(trx.order.paidAt), 'PPP')
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No transactions found.
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
