'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SpaceAndCreation = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // Example line art animation
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen py-20 px-8 bg-[#1a1a1a] text-white flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <motion.path
            d="M-100 500 Q 500 200 1100 500 T 2100 500"
            stroke="#008877"
            strokeWidth="2"
            fill="none"
            style={{ pathLength }}
          />
           <motion.path
            d="M-100 600 Q 500 900 1100 600 T 2100 600"
            stroke="#008877"
            strokeWidth="2"
            fill="none"
            style={{ pathLength, opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]) }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: '"Shippori Mincho", serif', color: '#008877' }}>
          空間と創造
        </h2>
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          lusion.coの "beyond visions with in reach" の部分を模倣したテキストです。
          ここに、建築の美しさや技術の可能性を融合させることについての説明が入ります。
        </p>
      </motion.div>
    </section>
  );
};

export default SpaceAndCreation;
