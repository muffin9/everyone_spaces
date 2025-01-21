'use client';

import { motion } from 'framer-motion';
import {
  Instagram,
  Facebook,
  Twitter,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-muted/40 mt-12"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="space-y-4">
            <h3 className="text-xl font-bold">모두의공간</h3>
            <p className="text-sm text-muted-foreground">
              공간을 찾고 공유하는 가장 쉬운 방법
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">고객 지원</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer">고객센터</li>
              <li className="hover:text-primary cursor-pointer">
                자주 묻는 질문
              </li>
              <li className="hover:text-primary cursor-pointer">이용 약관</li>
              <li className="hover:text-primary cursor-pointer">
                개인정보 처리방침
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">연락처</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                1544-0000
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                support@modoo.space
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                서울특별시 강남구
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-lg font-semibold">뉴스레터 구독</h3>
            <p className="text-sm text-muted-foreground">
              새로운 공간 소식을 받아보세요
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="이메일 주소"
                className="max-w-[220px]"
              />
              <Button>구독</Button>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-muted-foreground"
        >
          <p>© 2024 모두의공간. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
