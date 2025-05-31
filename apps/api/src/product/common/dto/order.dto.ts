import { z } from 'zod';

export const CreateOrderSchema = z.object({
  userId: z.string().uuid(),
  productId: z.string().uuid(),
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
};
