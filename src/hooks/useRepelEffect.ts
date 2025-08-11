// src/hooks/useRepelEffect.ts
'use client';

import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '@/context/CursorContext';

interface RepelEffectOptions {
  repelRadius?: number;
  repelStrength?: number;
  stiffness?: number;
  damping?: number;
}

const useRepelEffect = (
  initialLeftPercent: number, // 動物の初期の相対X位置 (パーセンテージ)
  initialTopPercent: number, // 動物の初期の相対Y位置 (パーセンテージ)
  options?: RepelEffectOptions
) => {
  const elementRef = useRef<HTMLImageElement>(null);
  const x = useMotionValue(0); // 相対的な移動量
  const y = useMotionValue(0); // 相対的な移動量

  const springConfig = {
    stiffness: options?.stiffness || 200,
    damping: options?.damping || 20,
  };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const { cursorX, cursorY } = useCursor();

  useEffect(() => {
    if (!elementRef.current) return;

    const updatePosition = () => {
      const parentRect = elementRef.current!.parentElement!.getBoundingClientRect(); // 親要素のサイズを取得
      const elementRect = elementRef.current!.getBoundingClientRect();

      // 初期位置のピクセル値を計算
      const initialPixelX = parentRect.width * (initialLeftPercent / 100);
      const initialPixelY = parentRect.height * (initialTopPercent / 100);

      const elementCenterX = parentRect.left + initialPixelX + elementRect.width / 2;
      const elementCenterY = parentRect.top + initialPixelY + elementRect.height / 2;

      const distanceX = cursorX - elementCenterX;
      const distanceY = cursorY - elementCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      const repelRadius = options?.repelRadius || 80;
      const repelStrength = options?.repelStrength || 0.2;

      if (distance < repelRadius) {
        const angle = Math.atan2(distanceY, distanceX);
        const repelAmount = (repelRadius - distance) * repelStrength;
        const newX = Math.cos(angle) * -repelAmount;
        const newY = Math.sin(angle) * -repelAmount;

        x.set(newX);
        y.set(newY);
      } else {
        x.set(0); // 相対的な移動量を0に戻す
        y.set(0); // 相対的な移動量を0に戻す
      }
    };

    const animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY, x, y, initialLeftPercent, initialTopPercent, options]);

  return { elementRef, springX, springY };
};

export default useRepelEffect;