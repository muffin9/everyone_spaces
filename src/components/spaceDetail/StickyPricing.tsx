'use client';

import { SpacePricingType } from '@/schema/spacePricing';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface StickyPricingProps {
  pricings: SpacePricingType[];
  spaceName: string;
  spaceId: string;
}

export default function StickyPricing({
  pricings,
  spaceName,
  spaceId,
}: StickyPricingProps) {
  const router = useRouter();
  const [selectedPricing, setSelectedPricing] =
    useState<SpacePricingType | null>(pricings[0] || null);

  const handleReserve = () => {
    if (!selectedPricing) return;

    // 선택된 pricing 데이터를 URL 파라미터로 전달
    const params = new URLSearchParams({
      spaceId: spaceId || '',
      pricingId: selectedPricing.id,
      price: selectedPricing.price.toString(),
      name: selectedPricing.name,
      minimumHours: selectedPricing.minimumHours.toString(),
      maximumHours: selectedPricing.maximumHours.toString(),
    });

    router.push(`/space/${spaceId}/reserve?${params.toString()}`);
  };

  console.log(pricings);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{spaceName}</h3>
            <p className="text-sm text-gray-600">
              {selectedPricing?.price.toLocaleString()}원/시간
            </p>
          </div>
          <Button onClick={handleReserve}>예약하기</Button>
        </div>

        <Select
          value={selectedPricing?.id}
          onValueChange={(value) => {
            const pricing = pricings.find((p) => p.id === value);
            if (pricing) setSelectedPricing(pricing);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="요금제 선택" />
          </SelectTrigger>
          <SelectContent>
            {pricings.map((pricing) => (
              <SelectItem key={pricing.id} value={pricing.id}>
                <div className="flex gap-4">
                  {pricing.instantBooking && (
                    <div className="flex items-center justify-center px-2 text-white bg-[#FFB41F] text-xs rounded-md">
                      바로 결제
                    </div>
                  )}
                  <div className="flex">
                    <span>{pricing.name}</span>
                    <span className="text-sm text-gray-500">
                      ({pricing.price.toLocaleString()}원/시간)
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
