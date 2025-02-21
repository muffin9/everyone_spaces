import { z } from 'zod';

export const spaceImagesSchema = z.object({
  id: z.string(), // 이미지 ID (UUID or Unique ID)
  spaceId: z.string(), // 연결된 공간 ID (외래 키)
  imageUrl: z.string().url(), // 이미지 URL (유효한 URL 형식)
  isPrimary: z.boolean(), // 대표 이미지 여부 (true/false)
  createdAt: z.string(), // 생성 날짜 (ISO String)
});

export const spaceImagesResponseSchema = z.array(spaceImagesSchema);

export type SpaceImage = z.infer<typeof spaceImagesSchema>; // TypeScript 타입 생성
