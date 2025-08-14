'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  isLoading: boolean;
}

const panelVariants: Variants = {
  initial: {
    x: '0%',
  },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'left' ? '-100%' : '100%',
    transition: { duration: 0.8, ease: "easeInOut" },
  }),
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <div className="pointer-events-none fixed inset-0 z-[999] flex">
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-[#008877] flex items-center justify-center overflow-hidden"
            initial="initial"
            exit="exit"
            variants={panelVariants}
            custom="left"
          >
            {/* Left panel - White Sakura (no overlap, filled gaps) */}
            <Image src="/images/sakura_white.svg" alt="Sakura" width={35} height={35} className="absolute bottom-[8%] left-[10%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={28} height={28} className="absolute bottom-[20%] left-[38%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={55} height={55} className="absolute bottom-[15%] left-[65%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={40} height={40} className="absolute bottom-[30%] left-[85%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[45%] left-[25%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={45} height={45} className="absolute bottom-[35%] left-[50%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={25} height={25} className="absolute bottom-[50%] left-[75%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={60} height={60} className="absolute bottom-[25%] left-[5%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={50} height={50} className="absolute bottom-[40%] left-[90%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[3%] left-[70%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={42} height={42} className="absolute bottom-[10%] left-[48%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={70} height={70} className="absolute bottom-[30%] left-[15%]" />
            
            <Image src="/images/sakura_white.svg" alt="Sakura" width={65} height={65} className="absolute bottom-[40%] left-[80%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[55%] left-[60%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={48} height={48} className="absolute bottom-[20%] left-[95%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={38} height={38} className="absolute bottom-[48%] left-[30%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={52} height={52} className="absolute bottom-[38%] left-[70%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={32} height={32} className="absolute bottom-[52%] left-[5%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={58} height={58} className="absolute bottom-[28%] left-[20%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={40} height={40} className="absolute bottom-[42%] left-[60%]" />
            {/* Adjusted to prevent overlaps and fill gaps */}
            <Image src="/images/sakura_white.svg" alt="Sakura" width={22} height={22} className="absolute bottom-[5%] left-[30%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={18} height={18} className="absolute bottom-[10%] left-[55%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[30%] left-[70%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={15} height={15} className="absolute bottom-[40%] left-[40%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={25} height={25} className="absolute bottom-[55%] left-[85%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[12%] left-[90%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[25%] left-[5%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={15} height={15} className="absolute bottom-[48%] left-[15%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={22} height={22} className="absolute bottom-[3%] left-[45%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={18} height={18} className="absolute bottom-[28%] left-[95%]" />
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-[#bb5555] flex items-center justify-center overflow-hidden"
            initial="initial"
            exit="exit"
            variants={panelVariants}
            custom="right"
          >
            {/* Right panel - White Sakura (no overlap, filled gaps) */}
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[12%] right-[18%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={25} height={25} className="absolute bottom-[25%] right-[45%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={50} height={50} className="absolute bottom-[18%] right-[70%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={35} height={35} className="absolute bottom-[32%] right-[80%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={28} height={28} className="absolute bottom-[40%] right-[20%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={40} height={40} className="absolute bottom-[38%] right-[55%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[52%] right-[78%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={65} height={65} className="absolute bottom-[28%] right-[10%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={45} height={45} className="absolute bottom-[45%] right-[95%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={15} height={15} className="absolute bottom-[5%] right-[65%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={38} height={38} className="absolute bottom-[15%] right-[30%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={75} height={75} className="absolute bottom-[35%] right-[5%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={60} height={60} className="absolute bottom-[35%] right-[75%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={25} height={25} className="absolute bottom-[50%] right-[50%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={50} height={50} className="absolute bottom-[22%] right-[90%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={42} height={42} className="absolute bottom-[46%] right-[25%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={55} height={55} className="absolute bottom-[36%] right-[68%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[54%] right-[12%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={62} height={62} className="absolute bottom-[26%] right-[35%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={45} height={45} className="absolute bottom-[40%] right-[60%]" />
            {/* Adjusted to prevent overlaps and fill gaps */}
            <Image src="/images/sakura_white.svg" alt="Sakura" width={22} height={22} className="absolute bottom-[5%] right-[30%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={18} height={18} className="absolute bottom-[10%] right-[55%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[30%] right-[70%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={15} height={15} className="absolute bottom-[40%] right-[40%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={25} height={25} className="absolute bottom-[55%] right-[85%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={30} height={30} className="absolute bottom-[12%] right-[90%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={20} height={20} className="absolute bottom-[25%] right-[5%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={15} height={15} className="absolute bottom-[48%] right-[15%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={22} height={22} className="absolute bottom-[3%] right-[45%]" />
            <Image src="/images/sakura_white.svg" alt="Sakura" width={18} height={18} className="absolute bottom-[28%] right-[95%]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;