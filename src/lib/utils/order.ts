import { nanoid } from 'nanoid';

export function generateOrderId(prefix: string = 'ORDER'): string {
  const timestamp = new Date().getTime();
  const randomId = nanoid(8); // 8자리 유니크 ID
  return `${prefix}_${timestamp}_${randomId}`;
}
