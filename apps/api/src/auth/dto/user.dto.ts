import { z } from 'zod';
import { AuthProvider, Role, UserStatus } from '@prisma/client';

export const CreateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6).optional(), // optional for Google/GitHub
  roles: z.nativeEnum(Role).array().optional().default([Role.CUSTOMER]),
  avatar: z.string().url().optional(),
  status: z.nativeEnum(UserStatus).optional().default(UserStatus.ACTIVE),
  provider: z
    .nativeEnum(AuthProvider)
    .optional()
    .default(AuthProvider.CREDENTIAL),
  providerId: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
