import { z } from 'zod';

export const operatingHourSchema = z.object({
  id: z.string().uuid(),
  spaceId: z.string().uuid(),
  dayOfWeek: z.number(),
  openTime: z.string(),
  closeTime: z.string(),
  isClosed: z.boolean().default(false),
});
