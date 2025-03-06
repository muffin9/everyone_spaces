import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '모두의 공간',
  description: '모두의 공간',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
