import { LucideProps } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

export const icons = {
  meeting: dynamic(() => import('lucide-react').then((mod) => mod.Briefcase)),
  study: dynamic(() => import('lucide-react').then((mod) => mod.BookOpen)),
  party: dynamic(() => import('lucide-react').then((mod) => mod.PartyPopper)),
  studio: dynamic(() => import('lucide-react').then((mod) => mod.Camera)),
  practice: dynamic(() => import('lucide-react').then((mod) => mod.Music)),
} as const;

export const categoryColors = {
  meeting: 'bg-blue-50 text-blue-500',
  study: 'bg-green-50 text-green-500',
  party: 'bg-purple-50 text-purple-500',
  studio: 'bg-rose-50 text-rose-500',
  practice: 'bg-amber-50 text-amber-500',
} as const;

export type CategoryIconType = ComponentType<LucideProps>; 