'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute bottom-4 left-4 z-10 rounded-full bg-white/70 px-3 py-2 text-sm hover:bg-white"
    >
      ← Back
    </button>
  );
}
