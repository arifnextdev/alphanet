'use client';

import { EyeIcon } from 'lucide-react';
import { OrderModalForm } from './_components/OrderModalForm';

import Link from 'next/link';
import MailModal from './_components/MailModal';
import ToggoleStatus from './_components/ToggoleStatus';
import { IOrder, useGetOrdersQuery } from '@/lib/services/ordersApi';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function OrderPage() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useGetOrdersQuery({
    page,
    limit: pageSize,
    search: query,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  });

  const orders = data?.orders || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-xl">Order List</CardTitle>
          <div className="flex space-x-3">
            <Input
              type="search"
              placeholder="Search by domain name..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="max-w-sm"
            />

            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="ALL">All Statuses</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="DELETED">Deleted</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <OrderModalForm />
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading orders</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Id</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>metadata</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead>Expires At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order: IOrder) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.domainName || '—'}</TableCell>
                    <TableCell>
                      {order.status === 'PENDING' && (
                        <Badge className="bg-yellow-600 text-white">
                          Pending
                        </Badge>
                      )}
                      {order.status === 'PAID' && (
                        <Badge className="bg-blue-600 text-white">Paid</Badge>
                      )}
                      {order.status === 'PROCESSING' && (
                        <Badge className="bg-purple-600 text-white">
                          Processing
                        </Badge>
                      )}
                      {order.status === 'COMPLETED' && (
                        <Badge className="bg-green-700 text-white">
                          Completed
                        </Badge>
                      )}
                      {order.status === 'FAILED' && (
                        <Badge variant="destructive">Failed</Badge>
                      )}
                      {order.status === 'EXPIRED' && (
                        <Badge className="bg-gray-500 text-white">
                          Expired
                        </Badge>
                      )}
                      {order.status === 'CANCELLED' && (
                        <Badge className="bg-red-500 text-white">
                          Cancelled
                        </Badge>
                      )}
                      {order.status === 'REFUNDED' && (
                        <Badge className="bg-indigo-600 text-white">
                          Refunded
                        </Badge>
                      )}
                      {/* Fallback for unknown status */}
                      {![
                        'PENDING',
                        'PAID',
                        'PROCESSING',
                        'COMPLETED',
                        'FAILED',
                        'EXPIRED',
                        'CANCELLED',
                        'REFUNDED',
                      ].includes(order.status) && (
                        <Badge variant="outline">{order.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>{order.metadata}</TableCell>
                    <TableCell>
                      {order.paidAt
                        ? new Date(order.paidAt).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell>
                      {order.expiresAt
                        ? new Date(order.expiresAt).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell className="text-right flex justify-end gap-3 items-center">
                      <ToggoleStatus id={order.id} status={order.status} />
                      <Link href={`/admin/orders/${order.id}`}>
                        <EyeIcon className="w-5 h-5" />
                      </Link>

                      <MailModal id={order.userId} />
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground"
                    >
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="default"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
