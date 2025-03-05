'use client';

import Header from '@/components/common/Header';
import Reserve from '@/components/reserve';

export default function ReservePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Reserve />
      </main>
    </div>
  );
}
