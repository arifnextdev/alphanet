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
import { IProduct, useGetProductsQuery } from '@/lib/services/productsApi';
import { toast } from 'sonner';

export function OrderModalForm() {
  const [domainName, setDomainName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [productType, setProductType] = useState<string>('HOSTING');
  const [products, setProducts] = useState<IProduct[]>([]);

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data } = useGetProductsQuery({ type: productType, limit: 10 });

  useEffect(() => {
    if (data?.products) setProducts(data.products);
  }, [data]);

  const handleOrderAdd = async () => {
    if (!selectedProductId) return;

    const orderData = {
      domainName,
      productId: selectedProductId,
      username,
      password,
      userId,
      paymentMethod: 'CASH',
    };

    toast.promise(createOrder(orderData).unwrap(), {
      loading: 'Creating order...',
      success: 'Order created successfully!',
      error: 'Failed to create order',
    });
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
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="HOSTING">Hosting</SelectItem>
                  <SelectItem value="DOMAIN">Domain</SelectItem>
                  <SelectItem value="VPS">VPS</SelectItem>
                  <SelectItem value="CLOUD">Cloud</SelectItem>
                  <SelectItem value="DEDICATED">Dedicated</SelectItem>
                  <SelectItem value="EMAIL">Email</SelectItem>
                  <SelectItem value="SSL">SSL</SelectItem>
                  <SelectItem value="SMS">SMS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Product Dropdown */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
            <Select
              value={selectedProductId ? selectedProductId : 'select a product'}
              onValueChange={(val) => setSelectedProductId(val)}
            >
              <SelectTrigger className="col-span-3">
                {selectedProductId ? selectedProductId : 'Select a product'}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {products?.map((product: IProduct) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              userId
            </Label>
            <Input
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>

          {/* 🌐 Domain Name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domainName" className="text-right">
              Domain Name
            </Label>
            <Input
              id="domainName"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleOrderAdd}
            disabled={
              isLoading ||
              !selectedProductId ||
              !userId ||
              !username ||
              !password
            }
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
