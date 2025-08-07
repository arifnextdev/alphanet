import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUpdateOrderStatusMutation } from '@/lib/services/ordersApi';
import { PencilIcon } from 'lucide-react';
import { toast } from 'sonner';

const ORDER_STATUS_OPTIONS = [
  'PENDING',
  'PAID',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'EXPIRED',
  'CANCELLED',
  'REFUNDED',
];

const ToggoleStatus = ({
  id,
  status,
  options = ORDER_STATUS_OPTIONS,
}: {
  id: string;
  status: string;
  url?: string;
  options?: string[];
}) => {
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateOrderStatus({ id, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update order status');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" disabled={isLoading}>
          <PencilIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div>
          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <Button
                key={option}
                variant={option === status ? 'default' : 'outline'}
                onClick={() => handleStatusChange(option)}
                disabled={isLoading || option === status}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ToggoleStatus;
