'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface DigitalCardProps {
  iconUrl: string;
  title: string;
  description: string;
  index: number;
  isMobile: boolean | undefined;
}

const DigitalCard: React.FC<DigitalCardProps> = ({ iconUrl, title, description, index, isMobile }) => {
  return (
    <motion.div
      initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: -100 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{
        backgroundColor: '#FFFFFF',
        color: '#008877',
      }}
      className="group w-full max-w-3xl flex items-center gap-6 p-6 rounded-lg bg-white/10 text-white transition-colors duration-300 cursor-pointer"
    >
      <motion.div
        className="relative w-16 h-16 flex-shrink-0"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Using a generic icon for now as image URLs are placeholders */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white group-hover:text-main-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </motion.div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="opacity-90">{description}</p>
        <div className="mt-2">
            <span className="text-sm font-bold opacity-70 group-hover:text-main-red transition-colors">
                Learn More &rarr;
            </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DigitalCard;
