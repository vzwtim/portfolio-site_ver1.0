'use client';

import { useRouter } from 'next/navigation';
import type { ComponentPropsWithoutRef } from 'react';

interface BackButtonProps extends ComponentPropsWithoutRef<'button'> {}

export default function BackButton({ className = '', ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`rounded-full bg-white/70 px-3 py-2 text-sm hover:bg-white ${className}`}
      {...props}
    >
      ← Back
    </button>
  );
}
