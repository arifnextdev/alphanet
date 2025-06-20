'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCupponsQuery } from '@/lib/services/cuppons';
import { useState } from 'react';
import CreateCouponModal from '../_components/cupponsModal';
import UpdateCupponModal from '../_components/UpdateCupponModal';

const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));

export default function CouponsPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data } = useGetCupponsQuery(
    { page, limit: Number(pageSize), search: query },
    { refetchOnMountOrArgChange: true },
  );

  const coupons = data?.cuppons || [];

  const today = new Date();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Coupons</h1>
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search by code or status"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
          <CreateCouponModal open={open} setOpen={setOpen} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coupon List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.length > 0 ? (
                coupons.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.code}</TableCell>
                    <TableCell>
                      {c.discount % 1 === 0
                        ? `$${c.discount}`
                        : `${c.discount}%`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          c.status === 'ACTIVE'
                            ? 'default'
                            : c.status === 'EXPIRED'
                              ? 'destructive'
                              : 'outline'
                        }
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`${c.expiresAt < today ? 'text-destructive' : 'text-green-500 font-semibold'}`}
                    >
                      {formatDate(c.expiresAt)}
                    </TableCell>
                    <TableCell>{formatDate(c.expiresAt)}</TableCell>
                    <TableCell>
                      <UpdateCupponModal cuppon={c} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground"
                  >
                    No coupons found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">
              Page {page} of {data?.pagination.totalPages || 1}
            </span>
            <div className="space-x-2">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button
                disabled={page === data?.pagination.totalPages}
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
