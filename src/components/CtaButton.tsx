'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CtaButton: React.FC<CtaButtonProps> = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{
        backgroundColor: '#a04040', // main-red-dark
        color: '#ffffff',
        transition: { duration: 0.3 }
      }}
      className="bg-white text-main-green-dark font-bold py-3 px-8 rounded-lg shadow-lg"
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default CtaButton;
