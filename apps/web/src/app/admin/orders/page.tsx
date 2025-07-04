'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { useGetOrdersQuery } from '@/lib/services/ordersApi';
import { Copy, EyeIcon } from 'lucide-react';
import { OrderModalForm } from './_components/OrderModalForm';

import Link from 'next/link';
import MailModal from './_components/MailModal';
import ToggoleStatus from './_components/ToggoleStatus';

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
                {orders.map((order: any) => (
                  <TableRow key={order.id} className="group">
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.domainName || '—'}</TableCell>
                    <TableCell>
                      {order.status === 'ACTIVE' ? (
                        <Badge className="bg-green-600 text-white">
                          Active
                        </Badge>
                      ) : order.status === 'INACTIVE' ? (
                        <Badge className="bg-secondary-foreground">
                          Inactive
                        </Badge>
                      ) : order.status === 'PENDING' ? (
                        <Badge className="bg-yellow-600">Pending</Badge>
                      ) : (
                        <Badge variant="destructive">Faild</Badge>
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
                      <ToggoleStatus
                        id={order.id}
                        options={[
                          'PAID',
                          'CANCELLED',
                          'REFUNDED',
                          'EXPIRED',
                        ]}
                        status={order.status}
                        url={`orders/${order.id}/status`}
                      />
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
