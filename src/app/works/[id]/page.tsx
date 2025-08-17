// src/app/works/[id]/page.tsx
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { useEffect, useRef } from 'react';
import works from '../../../../materials/works.json';
import BackButton from '@/components/BackButton';

type Work = {
  id: string;
  title: string;
  description: string;
  monochromeImage: string;
  colorImage: string;
  images?: string[];
  bgColor?: string;
};

type PageProps = { params: { id: string } };

export function generateStaticParams() {
  return (works as Work[]).map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = decodeURIComponent(params.id);
  const work = (works as Work[]).find((w) => w.id === id);
  if (!work) {
    return { title: 'Work not found' };
  }
  return {
    title: work.title,
    description: work.description,
  };
}

export default function WorkPage({ params }: PageProps) {
  const id = decodeURIComponent(params.id);
  const work = (works as Work[]).find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  const images =
    work.images && work.images.length > 0
      ? work.images
      : [work.colorImage, work.monochromeImage].filter(Boolean);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative flex h-screen w-screen overflow-x-auto overflow-y-hidden text-gray-900"
      style={{ backgroundColor: work.bgColor }}
    >
      <BackButton />
      <div className="flex-shrink-0 h-full w-[40vw] flex items-center p-8">
        <div className="max-w-md text-left">
          <h1 className="text-4xl font-bold mb-6">{work.title}</h1>
          <p className="text-lg leading-relaxed">{work.description}</p>
        </div>
      </div>
      {images.map((src, idx) => (
        <div key={idx} className="relative flex-shrink-0 h-full w-[60vw]">
          <Image src={src} alt={idx === 0 ? work.title : ''} fill className="object-cover" />
        </div>
      ))}
    </main>
  );
}

