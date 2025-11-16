'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
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
  blur?: number;
}

const FloatingShape: React.FC<FloatingShapeProps> = ({
  size,
  top,
  left,
  right,
  color,
  delay = 0,
  blur = 0,
}) => (
  <motion.span
    className="absolute rounded-[35%] mix-blend-screen"
    style={{
      width: size,
      height: size,
      top,
      left,
      right,
      background: color,
      filter: blur ? `blur(${blur}px)` : undefined,
    }}
    animate={{
      y: ['-4%', '4%', '-4%'],
      scale: [1, 1.08, 1],
      rotate: [0, 1.5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

const leftShapes: FloatingShapeProps[] = [
  { size: 220, top: '8%', left: '4%', color: 'rgba(255,255,255,0.10)', blur: 35 },
  { size: 150, top: '32%', left: '20%', color: 'linear-gradient(160deg, #a8ff78, #78ffd6)', delay: 0.2 },
  { size: 90, top: '62%', left: '48%', color: 'linear-gradient(120deg, rgba(255,255,255,0.4), transparent)', delay: 0.35 },
  { size: 110, top: '52%', left: '8%', color: '#4FFFB033', delay: 0.5 },
  { size: 70, top: '18%', left: '56%', color: '#C9FFD5aa', delay: 0.1 },
  { size: 180, top: '72%', left: '22%', color: 'rgba(255,255,255,0.08)', blur: 30, delay: 0.65 },
];

const rightShapes: FloatingShapeProps[] = [
  { size: 210, top: '10%', right: '6%', color: 'rgba(255,255,255,0.10)', blur: 35 },
  { size: 140, top: '38%', right: '18%', color: 'linear-gradient(160deg, #ffe29a, #ffa99f)', delay: 0.15 },
  { size: 95, top: '64%', right: '44%', color: 'linear-gradient(120deg, rgba(255,255,255,0.4), transparent)', delay: 0.3 },
  { size: 120, top: '52%', right: '6%', color: '#FFB1DC55', delay: 0.5 },
  { size: 80, top: '20%', right: '50%', color: '#FFD7BAaa', delay: 0.05 },
  { size: 160, top: '74%', right: '26%', color: 'rgba(255,255,255,0.08)', blur: 28, delay: 0.7 },
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
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
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 60%)' }}
              animate={{ backgroundPosition: ['0% 0%', '120% 120%', '0% 0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -left-1/4 top-1/4 h-1/2 w-1/2 bg-gradient-to-r from-white/20 to-transparent blur-3xl"
              animate={{ x: ['0%', '40%', '-10%'], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {leftShapes.map((shape) => (
              <FloatingShape key={`${shape.top}-${shape.left ?? shape.right}`} {...shape} />
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
            <motion.div
              className="absolute inset-0 opacity-25"
              style={{ backgroundImage: 'linear-gradient(225deg, rgba(255,255,255,0.45) 0%, transparent 60%)' }}
              animate={{ backgroundPosition: ['100% 0%', '-20% 120%', '100% 0%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-1/4 top-1/3 h-1/3 w-1/2 bg-gradient-to-l from-white/30 to-transparent blur-3xl"
              animate={{ x: ['0%', '-40%', '10%'], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            {rightShapes.map((shape) => (
              <FloatingShape key={`${shape.top}-${shape.left ?? shape.right}`} {...shape} />
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
