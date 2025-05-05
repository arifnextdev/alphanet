import { z } from 'zod';

export const CreateOrderSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  domainName: z.string(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string().min(3).max(20).optional(),
});

export type OrederCreateDto = z.infer<typeof CreateOrderSchema>;

export type GetOrderDto = {
  limit: number;
  page: number;
  search?: string;
  status?: string;
};


export type GetFilterDto = {
  dateRange:
    | 'today'
    | 'tomorrow'
    | 'last7days'
    | 'last15days'
    | 'last30days'
    | 'lastmonth';
  status?: string;
}