import { z } from 'zod';

export const spacesSchema = z.object({
  id: z.string(), // 문자열 (UUID or Unique ID)
  host_id: z.string(), // 호스트 ID (외래 키)
  category_id: z.string(), // 카테고리 ID (외래 키)
  name: z.string(), // 공간 이름
  description: z.string().nullable(), // 설명 (nullable)
  address: z.string(), // 주소
  detailed_address: z.string().nullable(), // 상세 주소 (nullable)
  latitude: z.number().nullable(), // 위도 (nullable)
  longitude: z.number().nullable(), // 경도 (nullable)
  max_capacity: z.number().nullable(), // 최대 수용 인원 (nullable)
  base_price: z.number(), // 기본 가격 (필수)
  minimum_hours: z.number(), // 최소 이용 시간 (필수)
  amenities: z.any().nullable(), // JSON 형태 (nullable)
  rules: z.array(z.string()).nullable(), // 규칙 배열 (nullable)
  status: z.string(), // 상태 (예: 'active', 'inactive')
  created_at: z.string(), // 생성 날짜 (ISO String)
  updated_at: z.string(), // 업데이트 날짜 (ISO String)
});

export const spacesResponseSchema = z.array(spacesSchema)

export type Space = z.infer<typeof spacesSchema>; // TypeScript 타입 생성
