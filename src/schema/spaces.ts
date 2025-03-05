import { z } from 'zod';
import { categorySchema } from './category';
import { spaceImagesSchema } from './spaceImages';
import { spaceCautionSchema } from './spaceCaution';
import { operatingHourSchema } from './operatingHour';
import { spacePricingSchema } from './spacePricing';

export const spacesSchema = z.object({
  id: z.string().uuid(), // UUID 형식 명시
  hostId: z.string().uuid().nullable(), // UUID, nullable
  categoryId: z.string().uuid().nullable(), // UUID, nullable
  name: z.string(), // 공간 이름
  description: z.string().nullable(), // 설명 (nullable)
  address: z.string(), // 주소
  detailedAddress: z.string().nullable(), // 상세 주소 (nullable)
  latitude: z.number(), // numeric type은 nullable
  longitude: z.number(),
  maxCapacity: z.number().nullable(), // 최대 수용 인원 (nullable)
  basePrice: z.number(), // 기본 가격 (필수)
  minimumHours: z.number().default(1), // default 값 추가
  amenities: z.record(z.boolean()), // jsonb type은 nullable
  rules: z.array(z.string()).nullable(), // 규칙 배열 (nullable)
  status: z.string().default('active'),
  cancellationPolicy: z.string().nullable(), // nullable 추가
  preparationTime: z.number().default(0),
  cleanupTime: z.number().default(0),
  availableStartTime: z.string().nullable(), // time type은 nullable
  availableEndTime: z.string().nullable(),
  minBookingNotice: z.number().default(0),
  maxBookingDays: z.number().default(90),
  instantBooking: z.boolean().default(false),
  ratingAverage: z.number().default(0),
  reviewCount: z.number().default(0),
  viewCount: z.number().default(0),
  createdAt: z.string(), // timestamp with time zone
  updatedAt: z.string(),
  category: categorySchema,
  images: z.array(spaceImagesSchema),
  pricing: z.array(spacePricingSchema),
});

export const spaceInfoSchema = spacesSchema.extend({
  cautions: z.array(spaceCautionSchema).default([]),
  operatingHours: z.array(operatingHourSchema).default([]),
});

export const spacesResponseSchema = z.array(spacesSchema);

export type SpaceType = z.infer<typeof spacesSchema>; // TypeScript 타입 생성

export type SpaceInfoType = z.infer<typeof spaceInfoSchema>;
