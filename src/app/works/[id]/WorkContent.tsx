// src/app/works/[id]/WorkContent.tsx
'use client';

import FadeInImage from '@/components/FadeInImage';
import BackButton from '@/components/BackButton';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { useEffect, useState } from 'react';

export type Work = {
  id: string;
  title: string;
  description: string;
  monochromeImage: string;
  colorImage: string;
  images?: string[];
  bgColor?: string;
};

interface WorkContentProps {
  work: Work;
  images: string[];
}

export default function WorkContent({ work, images }: WorkContentProps) {
  const scrollRef = useHorizontalScroll<HTMLDivElement>();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      ref={scrollRef}
      className="relative h-screen w-screen overflow-x-auto overflow-y-hidden text-gray-900"
      style={{ backgroundColor: work.bgColor }}
    >
      <div
        className={`flex h-full w-full transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <BackButton />
        <div className="flex-shrink-0 h-full w-[40vw] flex items-center p-8">
          <div className="max-w-md text-left">
            <h1
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.title}
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.description}
            </p>
          </div>
        </div>
        {images.map((src, idx) => (
          <ResponsiveImage key={idx} src={src} alt={idx === 0 ? work.title : ''} />
        ))}
      </div>
    </main>
  );
}

function ResponsiveImage({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState(1);
  return (
    <div className="flex-shrink-0 h-full flex items-center justify-center px-4">
      <div
        className="relative h-[80%] p-4 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <FadeInImage
          src={src}
          alt={alt}
          fill
          className="object-contain"
          onLoadingComplete={(img) => {
            setRatio(img.naturalWidth / img.naturalHeight);
          }}
        />
      </div>
    </div>
  );
}