import { z } from 'zod';

// 기본 카테고리 스키마
export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable(),
  iconUrl: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  isActive: z.boolean().nullable(),
  displayOrder: z.number().int().positive(),
});

// 하위 카테고리를 포함한 메인 카테고리 스키마
export const mainCategoryWithSubsSchema = categorySchema.extend({
  subCategories: z.array(categorySchema).default([]),
});

// API 응답을 위한 배열 스키마
export const categoriesResponseSchema = z.array(categorySchema);

// 타입 추출
export type Category = z.infer<typeof categorySchema>;
export type MainCategoryWithSubs = z.infer<typeof mainCategoryWithSubsSchema>;
