'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAddMetaDataMutation } from '@/lib/services/ordersApi';
import { TrashIcon } from 'lucide-react';

interface MetaDataModalProps {
  metadata: Record<string, string>; // ✅ Fix here
  orderId: string;
}

export default function MetaDataModal({
  metadata,
  orderId,
}: MetaDataModalProps) {
  const [localMetadata, setLocalMetadata] = useState<Record<string, string>>(
    metadata || {},
  );
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [open, setOpen] = useState(false);

  const [updateOrder, { isLoading }] = useAddMetaDataMutation();

  const handleChange = (key: string, value: string) => {
    setLocalMetadata((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDelete = (key: string) => {
    const { [key]: _, ...rest } = localMetadata;
    setLocalMetadata(rest);
  };

  const handleAddField = () => {
    if (!newKey.trim()) return;
    setLocalMetadata((prev) => ({
      ...prev,
      [newKey]: newValue,
    }));
    setNewKey('');
    setNewValue('');
  };

  const handleSubmit = async () => {
    console.log(localMetadata);
    try {
      await updateOrder({
        id: orderId,
        data: localMetadata,
      }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error('Failed to update metadata:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Metadata
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Metadata</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {Object.entries(localMetadata).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <Input value={key} readOnly className="w-1/3" />
              <Input
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(key)}
              >
                <TrashIcon className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <Input
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="w-1/3"
            />
            <Input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full"
            />
            <Button type="button" onClick={handleAddField}>
              Add
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Saving...' : 'Save Metadata'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
