export type AmenityKey =
  | 'tv'
  | 'wifi'
  | 'kitchen'
  | 'parking'
  | 'bathroom'
  | 'sound_system'
  | 'projector'
  | 'whiteboard'
  | 'desk';

export const space_amenities: Record<
  AmenityKey,
  {
    text: string;
    image_url: string;
  }
> = {
  tv: { text: '티비', image_url: '/amenities/tv.png' },
  wifi: { text: '와이파이', image_url: '/amenities/wifi.png' },
  kitchen: { text: '부엌', image_url: '/amenities/kitchen.png' },
  parking: { text: '주차', image_url: '/amenities/parking.png' },
  bathroom: { text: '화장실', image_url: '/amenities/bathroom.png' },
  sound_system: {
    text: '오디오시스템',
    image_url: '/amenities/sound_system.png',
  },
  projector: { text: '프로젝터', image_url: '/amenities/tv.png' },
  whiteboard: { text: '화이트보드', image_url: '/amenities/tv.png' },
  desk: { text: '책상', image_url: '/amenities/tv.png' },
} as const;
