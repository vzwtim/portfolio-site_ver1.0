'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0, pointerEvents: isLoading ? 'auto' : 'none' }}
      transition={{ duration: 0.5, delay: isLoading ? 0 : 1.5 }} // ローディング表示は即時、非表示は1.5秒後にフェードアウト
      className="fixed inset-0 flex items-center justify-center bg-[#232024] z-50"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoading ? 1 : 0, y: isLoading ? 0 : -20 }}
        transition={{ duration: 0.5, delay: isLoading ? 0.5 : 1 }}
        className="text-4xl md:text-6xl font-bold text-[#f7f7f7]"
        style={{ fontFamily: '"Shippori Mincho", serif' }}
      >
        Loading...
      </motion.h1>
    </motion.div>
  );
};

export default LoadingScreen;