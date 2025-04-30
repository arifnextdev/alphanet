'use client';

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '@/lib/services/productsApi';
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
import { Trash2Icon } from 'lucide-react';
import { ProductModalForm } from './_components/ProductModalForm';
import { UpdateProductModalForm } from './_components/UpdateProductModalForm';

export default function AdminProductsPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError } = useGetProductsQuery({
    page,
    limit: pageSize,
    search: query,
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    type: typeFilter !== 'ALL' ? typeFilter : undefined,
  });

  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.products || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-xl">Product List</CardTitle>
          <div className="flex space-x-3">
            <Input
              type="search"
              placeholder="Search by name..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="max-w-sm"
            />

            <Select
              value={typeFilter}
              onValueChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Product Type</SelectLabel>
                  <SelectItem value="ALL">Type All</SelectItem>
                  <SelectItem value="DOMAIN">DOMAIN</SelectItem>
                  <SelectItem value="HOSTING">HOSTING</SelectItem>
                  <SelectItem value="SSL">SSL</SelectItem>
                  <SelectItem value="EMAIL">EMAIL</SelectItem>
                  <SelectItem value="VPS">VPS</SelectItem>
                  <SelectItem value="CLOUD">CLOUD</SelectItem>
                  <SelectItem value="DEDICATED">DEDICATED</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="ALL">Status All</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="DELETED">Deleted</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <ProductModalForm />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading products</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Billing Cycle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell>{product.name || '—'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.billingCycle}</TableCell>
                    <TableCell>
                      {product.status === 'ACTIVE' ? (
                        <Badge className="bg-green-600 text-white">
                          Active
                        </Badge>
                      ) : product.status === 'INACTIVE' ? (
                        <Badge className='bg-secondary-foreground '>Inactive</Badge>
                      ) : product.status === 'PENDING' ? (
                        <Badge variant="destructive">Pending</Badge>
                      ) : (
                        <Badge variant="destructive">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      {/* <ProductUpdateModal product={product} /> */}
                      <UpdateProductModalForm product={product} />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2Icon className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      No products found.
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
