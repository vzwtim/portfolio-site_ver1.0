'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BirdAnimationProps {
  src: string;
  alt: string;
  initialX: number;
  finalX: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const BirdAnimation: React.FC<BirdAnimationProps> = ({
  src,
  alt,
  initialX,
  finalX,
  y,
  delay,
  duration,
  size,
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        top: `${y}%`,
        left: `${initialX}%`,
        width: `${size}vw`,
        height: 'auto',
        zIndex: 10, // 他の要素より手前に表示
      }}
      initial={{
        x: 0,
        opacity: 1,
      }}
      animate={{
        x: `${finalX - initialX}vw`, // initialXからの相対的な移動量
        opacity: 1,
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <Image src={src} alt={alt} layout="responsive" width={100} height={100} />
    </motion.div>
  );
};

export default BirdAnimation;
