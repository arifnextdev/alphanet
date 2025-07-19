'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Order, useGetOrdersByUserIdQuery } from '@/lib/services/usersApi';
import { Badge } from '@/components/ui/badge';
import { formateDate } from '@/lib/utils';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Orders = ({ id }: { id: string }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetOrdersByUserIdQuery({
    id,
    limit,
    page,
    search,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  });

  const pagination = data?.pagination;

  useEffect(() => {
    if (data?.data) {
      setOrders(data.data);
    }
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // reset to first page when limit changes
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">Order History</h2>
          <p className="text-sm text-muted-foreground">
            View and track your orders
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={handleSearchChange}
            className="w-full sm:w-[200px]"
          />
          <Select onValueChange={handleLimitChange} defaultValue="10">
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1); // reset to first page when filtering
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="EXPIRED">Expired</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="p-4 text-center">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order No</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid At</TableHead>
                    <TableHead>Expires At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, i) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {(page - 1) * limit + i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {order.product.name.length > 20
                          ? `${order.product.name.slice(0, 20)}...`
                          : order.product.name}
                      </TableCell>
                      <TableCell>{order.product.type}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            order.status === 'Completed'
                              ? 'bg-green-600 hover:bg-green-700'
                              : order.status === 'Pending'
                                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {order.paidAt ? formateDate(order.paidAt) : '—'}
                      </TableCell>
                      <TableCell
                        className={
                          order.expiresAt &&
                          new Date(order.expiresAt) < new Date()
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        {order.expiresAt ? formateDate(order.expiresAt) : '—'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link
                          href={`/users/orders/${order.id}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {pagination && (
          <div className="flex justify-between items-center p-4 border-t">
            <Button
              onClick={() => setPage(pagination.prevPage ?? 1)}
              disabled={pagination.prevPage === null}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              onClick={() => setPage(pagination.nextPage ?? 1)}
              disabled={pagination.nextPage === null}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default Orders;
