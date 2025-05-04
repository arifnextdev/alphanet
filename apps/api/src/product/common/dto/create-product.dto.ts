// src/modules/product/dto/create-product.dto.ts
import { z } from 'zod';
import { ProductType, ProductStatus, BillingCycle } from '@prisma/client';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.nativeEnum(ProductType),
  description: z.string().optional(),
  price: z.number().nonnegative().default(0),
  dicount: z.number().min(0).default(0),
  quantity: z.number().min(0).default(1),
  grade: z
    .enum(['FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE']).default('FREE'),
  config: z.any().optional(), // can validate specific shape if needed
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
  billingCycle: z.nativeEnum(BillingCycle).default(BillingCycle.MONTHLY),
  status: z.nativeEnum(ProductStatus).default(ProductStatus.ACTIVE),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
