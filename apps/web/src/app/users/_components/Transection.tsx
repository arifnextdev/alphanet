'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import {
  Payment,
  useGetTransactionsByUserIdQuery,
} from '@/lib/services/usersApi';
import { formateDate } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Transection = ({ id }: { id: string }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetTransactionsByUserIdQuery({
    id,
    limit,
    page,
    search,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
  });

  const pagination = data?.pagination;

  useEffect(() => {
    if (data?.data) {
      setTransactions(data.data);
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
          <h2 className="text-2xl font-bold ">Payment History</h2>
          <p className="">View your payment and billing history</p>
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
                <SelectItem value="SUCCESS">Success</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="DUE">Due</SelectItem>
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
          <CardTitle className="text-lg">Payment History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="p-4 text-center">No orders found.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="">Payment No</TableHead>
                    <TableHead className="">Transaction ID</TableHead>
                    <TableHead className="">Method</TableHead>
                    <TableHead className="">Amount</TableHead>
                    <TableHead className="">Sub Total</TableHead>
                    <TableHead className="">Status</TableHead>
                    <TableHead className="">Paid At</TableHead>

                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, i) => (
                    <TableRow key={transaction.id} className="">
                      <TableCell className="font-mono text-sm ">
                        {i + 1}
                      </TableCell>
                      <TableCell className="font-mono text-sm ">
                        {transaction.transId
                          ? transaction.transId
                          : transaction.id}
                      </TableCell>
                      <TableCell className="">{transaction.method}</TableCell>
                      <TableCell className="">{transaction.amount}</TableCell>
                      <TableCell className="">{transaction.subtotal}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            transaction.status === 'PAID'
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="">
                        {transaction.paidAt
                          ? formateDate(transaction.paidAt)
                          : '—'}
                      </TableCell>

                      <TableCell className="text-right">
                        <Link
                          href={`/users/orders/invoice/${transaction.id}`}
                          className="bg-blue-600 hover:bg-blue-700 border-blue-600 px-2 py-1 rounded-xl"
                        >
                          View Invoice
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

export default Transection;
