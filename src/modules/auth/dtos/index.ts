import { z } from 'zod';

export const upadateTokenDto = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type UpadateTokenDto = z.infer<typeof upadateTokenDto>;
