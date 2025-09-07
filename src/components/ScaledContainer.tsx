'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Align = 'left' | 'center';

interface ScaledContainerProps {
  children: React.ReactNode;
  baseWidth?: number; // px. Design width to scale from. Default: 1152 (≈ max-w-6xl)
  minScale?: number; // Minimum scale factor
  maxScale?: number; // Maximum scale factor (Infinity by default)
  align?: Align; // Transform origin alignment
}

/**
 * Scales its children proportionally to fit the available width while
 * preserving the original layout and aspect ratios. The outer wrapper's
 * height is adjusted to the scaled inner height so the layout flow stays intact.
 */
export default function ScaledContainer({
  children,
  baseWidth = 1152,
  minScale = 0.25,
  maxScale = Number.POSITIVE_INFINITY,
  align = 'left',
}: ScaledContainerProps) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState(0);

  // Recompute scale when container resizes
  useLayoutEffect(() => {
    if (!outerRef.current) return;
    const el = outerRef.current;
    const update = () => {
      const available = el.clientWidth; // content-box width inside paddings
      if (available <= 0) return;
      const next = Math.min(Math.max(available / baseWidth, minScale), maxScale);
      setScale(next);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth, minScale, maxScale]);

  // Track inner content height to reserve correct outer height
  useEffect(() => {
    const target = innerRef.current;
    if (!target) return;
    const apply = () => setInnerHeight(target.offsetHeight);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(target);
    return () => ro.disconnect();
  }, [children]);

  const origin = align === 'center' ? 'top center' : 'top left';

  return (
    <div ref={outerRef} style={{ width: '100%', height: innerHeight * scale }}>
      <div
        ref={innerRef}
        style={{
          width: baseWidth,
          transform: `scale(${scale})`,
          transformOrigin: origin,
        }}
      >
        {children}
      </div>
    </div>
  );
}
