import { z } from 'zod';

export const spacePricingSchema = z.object({
  id: z.string(),
  spaceId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isPackage: z.boolean(),
  instantBooking: z.boolean(),
  minimumHours: z.number(),
  maximumHours: z.number(),
  unitHours: z.number(),
  minCapacity: z.number(),
  maxCapacity: z.number(),
  peakPricing: z.boolean(),
  peakPrice: z.number(),
  weekendPricing: z.boolean(),
  weekendPrice: z.number(),
  refundPolicy: z.string(),
  isActive: z.boolean(),
  displayOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const spacePricingResponseSchema = z.array(spacePricingSchema);

export type SpacePricingType = z.infer<typeof spacePricingSchema>;
