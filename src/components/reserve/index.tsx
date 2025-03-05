'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Calendar } from '../ui/calendar';
import TimeSelector from './TimeSelector';
import { useState } from 'react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Reserve() {
  const searchParams = useSearchParams();
  const [selectedHours, setSelectedHours] = useState<number>(1);

  const pricingData = {
    spaceId: searchParams.get('spaceId'),
    pricingId: searchParams.get('pricingId'),
    price: Number(searchParams.get('price')),
    name: searchParams.get('name'),
    minimumHours: Number(searchParams.get('minimumHours')),
    maximumHours: Number(searchParams.get('maximumHours')),
  };

  const totalPrice = pricingData.price * selectedHours;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto space-y-6"
    >
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>예약 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">요금제</span>
              <span className="font-medium">{pricingData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">시간당 가격</span>
              <span className="font-medium">
                {pricingData.price.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">최소 예약 시간</span>
              <span className="font-medium">
                {pricingData.minimumHours}시간
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">최대 예약 시간</span>
              <span className="font-medium">
                {pricingData.maximumHours}시간
              </span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>예약 날짜 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>예약 시간 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSelector
              minimumHours={pricingData.minimumHours}
              maximumHours={pricingData.maximumHours}
              onTimeSelect={setSelectedHours}
            />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>결제 금액</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">선택 시간</span>
                <span className="font-medium">{selectedHours}시간</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">시간당 가격</span>
                <span className="font-medium">
                  {pricingData.price.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-500">총 결제 금액</span>
                <span className="text-xl font-bold">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
