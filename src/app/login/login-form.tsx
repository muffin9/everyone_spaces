'use client';

import { createClient } from 'supabase/supabase';
import Image from 'next/image';
import { NextResponse } from 'next/server';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const LoginForm = () => {
  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await createClient.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `http://localhost:3000/auth/callback`,
        },
      });

      if (error) throw error;

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <motion.div className="flex flex-col gap-2 text-center" {...fadeInUp}>
        <h1 className="text-2xl font-semibold tracking-tight">환영합니다!</h1>
        <p className="text-sm text-muted-foreground">
          로그인하고 공간을 공유해보세요
        </p>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
        <Image
          className="group relative w-full overflow-hidden  cursor-pointer"
          src="/kakao-logo.png"
          width={336}
          height={50}
          alt="Kakao login"
          onClick={handleKakaoLogin}
        />
      </motion.div>
    </div>
  );
};

export default LoginForm;
