'use client';

import { motion, MotionProps } from 'framer-motion';
import React, { ButtonHTMLAttributes } from 'react';

// Omit the conflicting 'onDrag' from standard button attributes, then merge with MotionProps
type CtaButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag'> & MotionProps & {
  children: React.ReactNode;
};

const CtaButton: React.FC<CtaButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      whileHover={{
        backgroundColor: '#a04040', // main-red-dark
        color: '#ffffff',
        transition: { duration: 0.3 }
      }}
      className={`bg-white text-main-green-dark font-bold py-3 px-8 rounded-lg shadow-lg ${className || ''}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default CtaButton;
