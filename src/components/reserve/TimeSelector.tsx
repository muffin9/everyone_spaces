'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TimeSelectorProps {
  minimumHours: number;
  maximumHours: number;
  onTimeSelect: (hours: number) => void;
}

export default function TimeSelector({
  minimumHours,
  maximumHours,
  onTimeSelect,
}: TimeSelectorProps) {
  const [selectedHours, setSelectedHours] = useState<number>(minimumHours);

  const handleHourSelect = (hours: number) => {
    setSelectedHours(hours);
    onTimeSelect(hours);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {Array.from(
          { length: maximumHours - minimumHours + 1 },
          (_, i) => minimumHours + i,
        ).map((hours) => (
          <Button
            key={hours}
            variant={selectedHours === hours ? 'default' : 'outline'}
            className={cn(
              'w-full',
              selectedHours === hours && 'bg-primary text-primary-foreground',
            )}
            onClick={() => handleHourSelect(hours)}
          >
            {hours}시간
          </Button>
        ))}
      </div>
      <div className="text-sm text-gray-500">
        * 최소 {minimumHours}시간부터 최대 {maximumHours}시간까지 선택
        가능합니다.
      </div>
    </div>
  );
}
