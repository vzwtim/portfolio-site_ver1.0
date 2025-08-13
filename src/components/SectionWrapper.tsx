'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  clipPath?: 'diagonal-top' | 'diagonal-bottom';
  clipIntensity?: number;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  style = {},
  clipPath,
  clipIntensity = 5,
}) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  const getClipPathStyle = () => {
    if (!clipPath) return {};
    let polygon = '';
    if (clipPath === 'diagonal-top') {
      polygon = `polygon(0 ${clipIntensity}vw, 100% 0, 100% 100%, 0 100%)`;
    } else if (clipPath === 'diagonal-bottom') {
      polygon = `polygon(0 0, 100% 0, 100% calc(100% - ${clipIntensity}vw), 0 100%)`;
    }
    return { clipPath: polygon, WebkitClipPath: polygon };
  };

  const hasBackgroundImage = style.backgroundImage;

  return (
    <section ref={sectionRef} className={`relative overflow-hidden ${className}`} style={getClipPathStyle()}>
      {hasBackgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ ...style, y }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
