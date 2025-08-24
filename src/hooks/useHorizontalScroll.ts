// src/hooks/useHorizontalScroll.ts
'use client';

import { useRef, useEffect } from 'react';

export default function useHorizontalScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const SCROLL_MULTIPLIER = 3; // amplify scroll distance per wheel event

    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let rafId: number | null = null;

    const smoothScroll = () => {
      current += (target - current) * 0.1;
      el.scrollLeft = current;
      if (Math.abs(target - current) > 0.5) {
        rafId = requestAnimationFrame(smoothScroll);
      } else {
        rafId = null;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      target += e.deltaY * SCROLL_MULTIPLIER;
      if (rafId === null) rafId = requestAnimationFrame(smoothScroll);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return containerRef;
}
