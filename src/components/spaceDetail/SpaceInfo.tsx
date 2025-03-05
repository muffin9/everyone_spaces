'use client';

import { AmenityKey, space_amenities } from '@/constants/space';
import { Separator } from '../ui/separator';
import Image from 'next/image';

interface SpaceInfoProps {
  infoData: {
    name: string;
    address: string;
    detailed_address: string | null;
    amenities: Record<string, boolean>;
    max_capacity: number | null;
    rules: string[] | null;
    rating_average: number;
    view_count: number;
  };
}

export default function SpaceInfo({ infoData }: SpaceInfoProps) {
  return (
    <section className="relative flex flex-col gap-2">
      <header>
        <h2 className="text-3xl font-bold">{infoData.name}</h2>
        <h4 className="text-gray-500">
          {infoData.address} {infoData.detailed_address}
        </h4>
      </header>
      <div className="flex items-center gap-2">
        <span className="text-xs">{infoData.rating_average}</span>
        <Separator orientation="vertical" className="h-[12px] bg-black" />
        <span className="text-xs">후기({infoData.view_count})</span>
      </div>
      <div className="flex gap-4">
        {(Object.entries(infoData.amenities) as [AmenityKey, boolean][]).map(
          ([key, value]) => {
            return (
              value && (
                <div key={key} className="flex items-center gap-2">
                  <Image
                    src={space_amenities[key]?.image_url}
                    width={25}
                    height={25}
                    alt={space_amenities[key]?.text}
                  />
                  <span className="text-xs">{space_amenities[key]?.text}</span>
                </div>
              )
            );
          },
        )}
      </div>
      <div>
        <ul>
          {infoData.rules?.map((rule: string) => {
            return <li key={rule}>{rule}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
