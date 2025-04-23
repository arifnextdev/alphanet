import { z } from 'zod';
import { OrderStatus } from '@prisma/client';

export const CreateOrderSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  domainName: z.string().optional(),
  status: z.nativeEnum(OrderStatus).optional().default(OrderStatus.PENDING),
  amount: z.number().min(0),
  paidAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
