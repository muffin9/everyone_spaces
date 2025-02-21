import { z } from 'zod';

export const spaceCautionSchema = z.object({
  id: z.string().uuid(),
  spaceId: z.string().uuid(),
  content: z.string(),
  displayOrder: z.number(),
  isRequired: z.boolean().default(true),
  category: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const spaceCautionsResponseSchema = z.array(spaceCautionSchema);

// TypeScript 타입 생성
export type SpaceCaution = z.infer<typeof spaceCautionSchema>;
export type SpaceCautionsResponse = z.infer<typeof spaceCautionsResponseSchema>;

// 생성 시 사용할 스키마 (id와 timestamps 제외)
export const createSpaceCautionSchema = spaceCautionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateSpaceCaution = z.infer<typeof createSpaceCautionSchema>;

// 수정 시 사용할 스키마 (모든 필드 선택적)
export const updateSpaceCautionSchema = createSpaceCautionSchema.partial();

export type UpdateSpaceCaution = z.infer<typeof updateSpaceCautionSchema>;
