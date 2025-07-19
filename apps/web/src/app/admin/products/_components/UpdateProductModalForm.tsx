'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { IProduct, useUpdateProductMutation } from '@/lib/services/productsApi';
import { Loader2, PencilIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function UpdateProductModalForm({ product }: { product: IProduct }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [billingCycle, setBillingCycle] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [grade, setGrade] = useState('');
  const [discount, setDiscount] = useState('');
  const [config, setConfig] = useState<Record<string, unknown>>({});

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setType(product.type);
      setStatus(product.status);
      setQuantity(product.quantity?.toString() || '');
      setDiscount(product.discount?.toString() || '');
      setGrade(product.grade);
      setBillingCycle(product.billingCycle);
      setPrice(product.price?.toString() || '');
      setDescription(product.description);
      setConfig(product.config || {});
    }
  }, [product]);

  const handleUpdate = async () => {
    const updatedData = {
      ...product,
      name,
      type,
      status,
      billingCycle,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      discount: parseFloat(discount),
      grade,
      description,
      config,
    };

    await updateProduct({ id: product.id, data: updatedData });
    setOpen(false);
  };

  const renderConfigFields = () => {
    switch (type) {
      case 'DOMAIN':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Registrar</Label>
            <Input
              value={
                typeof config.registrar === 'string' ? config.registrar : ''
              }
              onChange={(e) =>
                setConfig({ ...config, registrar: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        );
      case 'HOSTING':
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Disk Space</Label>
              <Input
                value={typeof config.disk === 'string' ? config.disk : ''}
                onChange={(e) => setConfig({ ...config, disk: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bandwidth</Label>
              <Input
                value={
                  typeof config.bandwidth === 'string' ? config.bandwidth : ''
                }
                onChange={(e) =>
                  setConfig({ ...config, bandwidth: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </>
        );
      case 'SSL':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Provider</Label>
            <Input
              value={typeof config.provider === 'string' ? config.provider : ''}
              onChange={(e) =>
                setConfig({ ...config, provider: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        );
      case 'EMAIL':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email Accounts</Label>
            <Input
              value={typeof config.accounts === 'string' ? config.accounts : ''}
              onChange={(e) =>
                setConfig({ ...config, accounts: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        );
      case 'VPS':
      case 'DEDICATED':
      case 'CLOUD':
        return (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">CPU</Label>
              <Input
                value={typeof config.cpu === 'string' ? config.cpu : ''}
                onChange={(e) => setConfig({ ...config, cpu: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">RAM</Label>
              <Input
                value={typeof config.ram === 'string' ? config.ram : ''}
                onChange={(e) => setConfig({ ...config, ram: e.target.value })}
                className="col-span-3"
              />
            </div>
          </>
        );
      case 'SMS':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">SMS Count</Label>
            <Input
              value={typeof config.smsCount === 'string' ? config.smsCount : ''}
              onChange={(e) =>
                setConfig({ ...config, smsCount: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          <PencilIcon className="w-4 h-4 mr-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[780px]">
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
          <DialogDescription>
            Modify product details and save changes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
              min={0}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Discount</Label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="col-span-3"
              min={0}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="col-span-3"
              min={0}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Select Options</Label>
            <div className="col-span-3 grid grid-cols-3 items-center gap-5 pr-5">
              <Select value={billingCycle} onValueChange={setBillingCycle}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Billing Cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="MONTHLY">Monthly</SelectItem>
                    <SelectItem value="ANNUALLY">Annually</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Product Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="FREE">Free</SelectItem>
                    <SelectItem value="BASIC">Basic</SelectItem>
                    <SelectItem value="PREMIUM">Premium</SelectItem>
                    <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select value={type} disabled>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="HOSTING">Hosting</SelectItem>
                    <SelectItem value="DOMAIN">Domain</SelectItem>
                    <SelectItem value="VPS">VPS</SelectItem>
                    <SelectItem value="EMAIL">Email</SelectItem>
                    <SelectItem value="SSL">SSL</SelectItem>
                    <SelectItem value="DEDICATED">Dedicated</SelectItem>
                    <SelectItem value="CLOUD">Cloud</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {renderConfigFields()}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleUpdate}
            disabled={isLoading || !name || !price || !description}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Update Product'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
