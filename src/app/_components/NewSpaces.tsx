'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Space } from '@/schema/spaces';
import { useRouter } from 'next/navigation';

interface NewSpacesProps {
  newSpaces: Space[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export default function NewSpaces({ newSpaces }: NewSpacesProps) {
  const router = useRouter();
  return (
    <section className="my-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-primary">New </span>
              공간
            </h2>
            <p className="text-gray-600">새로운 공간을 만나보세요</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-primary hover:text-primary/80"
          >
            더 보기 <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newSpaces.map((space) => (
            <motion.div
              key={space.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/space/${space.id}`)}
            >
              <div className="relative">
                <Image
                  src={`/placeholder.svg?height=200&width=300&text=${space.name}`}
                  alt={space.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-3 left-3">{space.status}</Badge>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {space.name}
                  </h3>
                  <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                    ★ {space.base_price}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                    {space.latitude} {space.longitude}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    {space.base_price}
                  </p>
                </div>

                <motion.div className="mt-3 pt-3 border-t">
                  <button className="w-full text-sm text-gray-500 font-medium hover:text-gray-500/80">
                    예약하기
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
