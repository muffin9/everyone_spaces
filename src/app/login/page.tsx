'use client';

import { HomeIcon } from 'lucide-react';
import LoginForm from './login-form';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-gradient-to-br from-primary/5 via-muted to-primary/5">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
      </motion.div>

      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <HomeIcon className="size-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                모두의공간
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="rounded-2xl bg-white/80 p-6 shadow-xl shadow-primary/10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LoginForm />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
