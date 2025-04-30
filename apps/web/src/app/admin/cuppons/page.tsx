'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import CreateCouponModal from '../_components/cupponsModal';

const dummyCoupons = [
  {
    _id: '1',
    code: 'SAVE10',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    status: 'ACTIVE',
    expiresAt: new Date('2025-06-01'),
    createdAt: new Date('2024-04-01'),
  },
  {
    _id: '2',
    code: 'FLAT50',
    discountType: 'FIXED',
    discountValue: 50,
    status: 'INACTIVE',
    expiresAt: new Date('2024-04-10'),
    createdAt: new Date('2024-02-01'),
  },
];

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

export default function CouponsPage() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = dummyCoupons.filter(
    (c) =>
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.status.toLowerCase().includes(query.toLowerCase()),
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

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
          <Button onClick={() => setOpen(true)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create
          </Button>
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
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length > 0 ? (
                paginated.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell>{c.code}</TableCell>
                    <TableCell>{c.discountType}</TableCell>
                    <TableCell>
                      {c.discountType === 'PERCENTAGE'
                        ? `${c.discountValue}%`
                        : `$${c.discountValue}`}
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
                    <TableCell>{formatDate(c.expiresAt)}</TableCell>
                    <TableCell>{formatDate(c.createdAt)}</TableCell>
                    <TableCell>
                      <Button variant="destructive">
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
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
              Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Previous
              </Button>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateCouponModal open={open} setOpen={setOpen} />
    </div>
  );
}
