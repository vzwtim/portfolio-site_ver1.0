'use client';

import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const panelVariants: Variants = {
  initial: {
    x: '0%',
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? '-100%' : '100%',
    transition: { duration: 0.8, ease: 'easeInOut' },
  }),
};

interface FloatingShapeProps {
  size: number;
  top: string;
  left?: string;
  right?: string;
  color: string;
  delay?: number;
  prefersReducedMotion?: boolean;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  size,
  top,
  left,
  right,
  color,
  delay = 0,
  prefersReducedMotion = false,
}) => (
  <motion.span
    className="absolute rounded-[35%]"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      background: color,
      willChange: 'transform',
    }}
    animate={
      prefersReducedMotion
        ? { y: 0, scale: 1, rotate: 0 }
        : {
            y: ['-1.5%', '2%', '-1.5%'],
            scale: [1, 1.03, 1],
            rotate: [0, 0.8, 0],
          }
    }
    transition={
      prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 12,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay,
          }
    }
  />
);

const leftShapes: FloatingShapeProps[] = [
  { size: 160, top: '10%', left: '12%', color: 'rgba(255,255,255,0.14)', delay: 0 },
  { size: 120, top: '30%', left: '6%', color: '#81E6D955', delay: 0.12 },
  { size: 95, top: '48%', left: '26%', color: '#4FFFB033', delay: 0.24 },
  { size: 70, top: '62%', left: '12%', color: 'rgba(255,255,255,0.10)', delay: 0.08 },
  { size: 90, top: '72%', left: '44%', color: '#5CF6FF44', delay: 0.3 },
  { size: 60, top: '20%', left: '40%', color: '#C9FFD566', delay: 0.18 },
];

const rightShapes: FloatingShapeProps[] = [
  { size: 150, top: '12%', right: '12%', color: 'rgba(255,255,255,0.14)', delay: 0 },
  { size: 120, top: '34%', right: '8%', color: '#FFB1DC55', delay: 0.14 },
  { size: 95, top: '52%', right: '24%', color: '#FF9AA255', delay: 0.26 },
  { size: 70, top: '64%', right: '12%', color: 'rgba(255,255,255,0.10)', delay: 0.1 },
  { size: 90, top: '74%', right: '40%', color: '#FFD7BA55', delay: 0.32 },
  { size: 60, top: '22%', right: '38%', color: '#FFE29A55', delay: 0.2 },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isLoading && (
        <div className="pointer-events-none fixed inset-0 z-[999] flex">
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#00332F] via-[#00695C] to-[#00B894] flex items-center justify-center overflow-hidden"
            initial="initial"
            exit="exit"
            variants={panelVariants}
            custom="left"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 55%)' }}
            />
            {leftShapes.map((shape) => (
              <FloatingShape key={`${shape.top}-${shape.left ?? shape.right}`} {...shape} prefersReducedMotion={prefersReducedMotion} />
            ))}
            <div className="relative z-10 text-white text-center px-4">
              <p className="text-[0.6rem] sm:text-xs tracking-[0.45em] uppercase mb-2 opacity-80">portfolio</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.35em] sm:tracking-[0.5em] whitespace-nowrap">
                YUDAI BABA
              </p>
            </div>
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[#4A0E2C] via-[#A43958] to-[#FF5F6D] flex items-center justify-center overflow-hidden"
            initial="initial"
            exit="exit"
            variants={panelVariants}
            custom="right"
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'linear-gradient(225deg, rgba(255,255,255,0.32) 0%, transparent 55%)' }}
            />
            {rightShapes.map((shape) => (
              <FloatingShape key={`${shape.top}-${shape.left ?? shape.right}`} {...shape} prefersReducedMotion={prefersReducedMotion} />
            ))}
            <div className="relative z-10 text-white text-center px-4">
              <p className="text-[0.6rem] sm:text-xs tracking-[0.45em] uppercase mb-2 opacity-80">creative</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.35em] sm:tracking-[0.5em] whitespace-nowrap">
                INTERACTIVE CRAFT
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
