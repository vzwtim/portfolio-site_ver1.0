// src/app/works/[id]/WorkContent.tsx
'use client';

import FadeInImage from '@/components/FadeInImage';
import BackButton from '@/components/BackButton';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export type Work = {
  id: string;
  title: string;
  description: string;
  images?: string[];
  bgColor?: string;
  link?: string;
};

interface WorkContentProps {
  work: Work;
  images: string[];
}

export default function WorkContent({ work, images }: WorkContentProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const scrollRef = useHorizontalScroll<HTMLDivElement>(!isMobile);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      ref={scrollRef}
      className="relative w-screen min-h-screen overflow-y-auto overflow-x-hidden text-gray-900 md:h-screen md:overflow-x-auto md:overflow-y-hidden"
      style={{ backgroundColor: work.bgColor }}
    >
      <div
        className={`flex w-full transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        } flex-col md:flex-row md:h-full`}
      >
        <div className="flex-shrink-0 w-full md:w-[40vw] md:h-full flex items-center p-8">
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
            <div className="mt-8 flex items-center gap-4">
              <BackButton />
              {work.link && (
                <Link
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/70 px-4 py-2 text-sm hover:bg-white transition-colors"
                >
                  Visit Site →
                </Link>
              )}
            </div>
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
  const isGif = src.toLowerCase().endsWith('.gif');

  if (isGif) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center px-4 w-full md:w-auto md:h-full">
        <div
          className="relative w-full md:h-[80%] p-4 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden"
          style={{ aspectRatio: ratio }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="object-contain w-full h-full"
            onLoad={(e) => {
              const img = e.currentTarget;
              setRatio(img.naturalWidth / img.naturalHeight);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 flex items-center justify-center px-4 w-full md:w-auto md:h-full">
      <div
        className="relative w-full md:h-[80%] p-4 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden"
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