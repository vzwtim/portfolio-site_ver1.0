'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  bgColor?: string;
}

export default function BackButton({ bgColor }: BackButtonProps) {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = bgColor || '#fff';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.clipPath = `circle(150vmax at ${clientX}px ${clientY}px)`;
    overlay.style.transition = 'clip-path 0.6s ease-in';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(0px at ${clientX}px ${clientY}px)`;
    });
    setTimeout(() => {
      router.back();
      setTimeout(() => overlay.remove(), 600);
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-4 left-4 z-10 rounded-full bg-white/70 px-3 py-2 text-sm hover:bg-white"
    >
      ← Back
    </button>
  );
}
