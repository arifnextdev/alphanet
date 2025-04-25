'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

type ProductFormProps = {
  initialData?: {
    name: string;
    type: string;
    description?: string;
    price: number;
    billingCycle: string;
    isActive: boolean;
  };
  onSubmit: (values: {
    name: string;
    type: string;
    description?: string;
    price: number;
    billingCycle: string;
    isActive: boolean;
  }) => void;
};

export default function ProductForm({
  initialData,
  onSubmit: createProduct,
}: ProductFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      type: 'HOSTING',
      description: '',
      price: 0,
      billingCycle: 'MONTHLY',
      isActive: true,
    },
  );

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Type</Label>
          <Select
            defaultValue={formData.type}
            onValueChange={(value) => handleChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HOSTING">Hosting</SelectItem>
              <SelectItem value="STORAGE">Storage</SelectItem>
              <SelectItem value="SERVICE">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Price</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            required
          />
        </div>

        <div>
          <Label>Billing Cycle</Label>
          <Select
            defaultValue={formData.billingCycle}
            onValueChange={(value) => handleChange('billingCycle', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select billing cycle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MONTHLY">Monthly</SelectItem>
              <SelectItem value="YEARLY">Yearly</SelectItem>
              <SelectItem value="ONE_TIME">One Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <Label>Active</Label>
        <Switch
          checked={formData.isActive}
          //   onCheckedChange={(checked) => handleChange('isActive', checked)}
        />
        <Badge variant={formData.isActive ? 'default' : 'secondary'}>
          {formData.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      <Button type="submit">
        {initialData ? 'Update Product' : 'Create Product'}
      </Button>
    </form>
  );
}
