// src/hooks/useHorizontalScroll.ts
'use client';

import { useRef, useEffect } from 'react';

export default function useHorizontalScroll<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const SCROLL_MULTIPLIER = 3; // amplify scroll distance per wheel event

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * SCROLL_MULTIPLIER, behavior: 'smooth' });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return containerRef;
}
