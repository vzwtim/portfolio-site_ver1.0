'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== 'undefined' &&
      window.matchMedia('(hover: none), (pointer: coarse)').matches
  );
  const { cursorVariant } = useCursor();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const handleChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "#b33953", // Accent color
      mixBlendMode: "difference",
    },
    text: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: "#b33953",
      mixBlendMode: "difference",
    },
  };
  if (isTouchDevice) {
    return null;
  }

  return (
    <motion.div
      className="w-8 h-8 rounded-full fixed top-0 left-0 pointer-events-none z-50"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};

export default CustomCursor;
