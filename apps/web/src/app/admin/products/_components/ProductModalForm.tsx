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
import { useCreateProductMutation } from '@/lib/services/productsApi';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ProductModalForm() {
  const [type, setType] = useState<string>('HOSTING');
  const [status, setStatus] = useState<string>('ACTIVE');
  const [billingCycle, setBillingCycle] = useState<string>('MONTHLY');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [config, setConfig] = useState <any>({});

  const handleTypeChange = (value: string) => {
    setType(value);
    setConfig({}); // Reset config on type change
  };

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleProductAdd = () => {
    const productData = {
      name,
      type,
      description,
      price: parseFloat(price),
      billingCycle,
      status,
      config,
    };

    createProduct(productData);

    setName('');
    setType('HOSTING');
    setDescription('');
    setPrice('');
    setBillingCycle('MONTHLY');
    setStatus('ACTIVE');
    setConfig({});
  };

  const renderConfigFields = () => {
    switch (type) {
      case 'DOMAIN':
        return (
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Registrar</Label>
            <Input
              value={config.registrar || ''}
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
                value={config.disk || ''}
                onChange={(e) => setConfig({ ...config, disk: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Bandwidth</Label>
              <Input
                value={config.bandwidth || ''}
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
              value={config.provider || ''}
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
              value={config.accounts || ''}
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
                value={config.cpu || ''}
                onChange={(e) => setConfig({ ...config, cpu: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">RAM</Label>
              <Input
                value={config.ram || ''}
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
              value={config.smsCount || ''}
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[780px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Fill in product details and save to create a new product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              min={0}
              onChange={(e) => setPrice(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Select Type</Label>
            <div className="col-span-3 grid grid-cols-3 items-center gap-5 pr-5">
              {/* Billing Cycle */}
              <div className="">
                <Select value={billingCycle} onValueChange={setBillingCycle}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select billing cycle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                      <SelectItem value="ANNUALLY">Annually</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Product Status */}
              <div className="">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* Product Type */}
              <div className="">
                <Select value={type} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
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
          </div>

          {/* Dynamic Config Inputs */}
          {renderConfigFields()}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleProductAdd}
            disabled={isLoading || !name || !price || !description}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>Add Product</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
