import { z } from 'zod';

export const CreateOrderSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  domainName: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
  password: z.string().min(3).max(20),
});

export type OrederCreateDto = z.infer<typeof CreateOrderSchema>;

export type GetOrderDto = {
  limit: number;
  page: number;
  search?: string;
  status?: string;
};
