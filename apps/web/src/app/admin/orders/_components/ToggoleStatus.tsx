import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PencilIcon } from 'lucide-react';
import { toast } from 'sonner';

const ToggoleStatus = ({
  id,
  status,
  url,
  options = [],
}: {
  id: string;
  status: string;
  url: string;
  options: string[];
}) => {
  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error('Failed to update payment status');
      }
      toast.success('Payment status updated!');
    } catch (error) {
      toast.error('Failed to update payment status');
      console.error('Error updating payment status:', error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <PencilIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Payment</DialogTitle>
        </DialogHeader>

        <div className="">
          <div className="">
            {options.map((option) => (
              <Button key={option} onClick={() => handleStatusChange(option)}>
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
