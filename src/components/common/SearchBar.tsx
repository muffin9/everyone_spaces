'use client';

import { Search, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [date, setDate] = useState<Date>();

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto my-8 px-4"
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? '0 8px 30px rgba(0,0,0,0.12)'
            : '0 4px 6px rgba(0,0,0,0.05)',
        }}
        className={`
          bg-white rounded-full p-2 
          flex items-center gap-2 
          border border-gray-200
          transition-colors
          ${isFocused ? 'border-primary' : 'hover:border-gray-300'}
        `}
      >
        <div className="flex items-center flex-1 gap-2 px-4">
          <motion.div whileHover={{ scale: 1.1 }} className="p-2">
            <MapPin className="w-5 h-5 text-gray-400" />
          </motion.div>
          <input
            type="text"
            placeholder="지역 검색"
            className="flex-1 focus:outline-none text-sm"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <div className="h-8 w-[1px] bg-gray-200" />

        <div className="flex items-center flex-1 gap-2 px-4">
          <Popover>
            <PopoverTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 flex items-center gap-2 text-sm text-gray-500"
              >
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                {date ? format(date, 'PPP', { locale: ko }) : '날짜 선택'}
              </motion.button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ko}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            bg-primary text-white p-4 rounded-full
            flex items-center gap-2
            transition-colors hover:bg-primary/90
          "
        >
          <Search className="w-5 h-5" />
          <span className="text-sm font-medium pr-2">검색</span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-4 text-sm text-gray-500"
      >
        <p>
          인기 검색어:
          {['강남 스튜디오', '홍대 연습실', '회의실', '파티룸'].map((term) => (
            <motion.span
              key={term}
              whileHover={{ scale: 1.05, color: '#000' }}
              className="mx-2 cursor-pointer hover:text-primary"
            >
              {term}
            </motion.span>
          ))}
        </p>
      </motion.div>
    </motion.div>
  );
}
