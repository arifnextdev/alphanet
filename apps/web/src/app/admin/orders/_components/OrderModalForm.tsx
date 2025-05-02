'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

import { useCreateOrderMutation } from '@/lib/services/ordersApi';
import { useGetProductsQuery } from '@/lib/services/productsApi';

export function OrderModalForm() {
  const [status, setStatus] = useState('PENDING');
  const [amount, setAmount] = useState('');
  const [domainName, setDomainName] = useState('');
  const [query, setQuery] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { data: productData } = useGetProductsQuery({ search: query });

  useEffect(() => {
    const found = productData?.products?.find(
      (p: any) => p.id === selectedProductId
    );
    if (found) {
      setSelectedProduct(found);
      setAmount(found.price.toString());
    } else {
      setSelectedProduct(null);
    }
  }, [selectedProductId, productData]);

  const handleOrderAdd = () => {
    if (!selectedProduct) return;

    const orderData = {
      status,
      amount: parseFloat(amount),
      domainName,
      productId: selectedProduct.id,
    };

    createOrder(orderData);
    // Reset
    setStatus('PENDING');
    setAmount('');
    setDomainName('');
    setSelectedProductId(null);
    setSelectedProduct(null);
    setQuery('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[780px]">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>
            Fill in the order details and save to create a new order.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* 🔍 Search Products */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="search" className="text-right">
              Search Product
            </Label>
            <Input
              id="search"
              placeholder="Type product name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* ✅ Product Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
            <Select
              value={selectedProductId || ''}
              onValueChange={(val) => setSelectedProductId(val)}
            >
              <SelectTrigger className="col-span-3">
                {selectedProduct ? selectedProduct.name : 'Select a product'}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {productData?.products?.map((product: any) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* 💰 Price Display */}
          {selectedProduct && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                value={selectedProduct.price}
                readOnly
                className="col-span-3"
              />
            </div>
          )}

          {/* 🌐 Domain Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domainName" className="text-right">
              Domain Name (Optional)
            </Label>
            <Input
              id="domainName"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* 💵 Amount */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* 🔁 Status Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleOrderAdd}
            disabled={isLoading || !selectedProductId || !amount || !status}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Add Order</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
