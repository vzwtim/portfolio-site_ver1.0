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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        setLightboxIndex((idx) => (idx === null ? idx : (idx + 1) % images.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((idx) => (idx === null ? idx : (idx - 1 + images.length) % images.length));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [images.length, lightboxIndex]);

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
      className="relative w-screen min-h-screen overflow-y-auto overflow-x-hidden text-gray-900 pt-28 pb-16 md:pt-16 md:pb-0 md:h-[calc(100vh-9rem)] md:overflow-x-auto md:overflow-y-hidden"
      style={{ backgroundColor: work.bgColor }}
    >
      <div
        className={`flex w-full transition-opacity duration-700 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        } flex-col gap-8 md:flex-row md:gap-0 md:h-full`}
      >
        <div className="flex-shrink-0 w-full md:w-[800px] md:h-full flex items-center p-8 ">
          <div className="text-left md:pl-12">
            <h1
              className="text-4xl font-bold mb-12"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.title}
            </h1>
            <p
              className="text-sm leading-relaxed md:pr-12"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {work.description}
            </p>
            <div className="mt-12 flex items-center gap-4">
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
          <ResponsiveImage key={idx} src={src} alt={idx === 0 ? work.title : ''} onOpen={() => setLightboxIndex(idx)} />
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex]}
              alt="work detail"
              className="object-contain max-w-[90vw] max-h-[90vh]"
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-[1001] bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((idx) => (idx === null ? idx : (idx - 1 + images.length) % images.length));
                  }}
                  aria-label="Prev image"
                >
                  ‹
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-[1001] bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((idx) => (idx === null ? idx : (idx + 1) % images.length));
                  }}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function ResponsiveImage({ src, alt, onOpen }: { src: string; alt: string; onOpen: () => void }) {
  const [ratio, setRatio] = useState(1);
  const isGif = src.toLowerCase().endsWith('.gif');

  if (isGif) {
    return (
      <div className="flex-shrink-0 flex items-center justify-center px-4 w-full md:w-auto md:h-full">
        <div
          className="relative w-full md:h-[80%] p-4 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden cursor-zoom-in"
          style={{ aspectRatio: ratio }}
          onClick={onOpen}
          role="button"
          aria-label="Open image in detail view"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="object-contain w-full h-full transition-transform duration-300 ease-out"
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
        className="relative w-full md:h-[80%] p-4 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg overflow-hidden cursor-zoom-in"
        style={{ aspectRatio: ratio }}
        onClick={onOpen}
        role="button"
        aria-label="Open image in detail view"
      >
        <FadeInImage
          src={src}
          alt={alt}
          fill
          className="object-contain transition-transform duration-300 ease-out"
          onLoadingComplete={(img) => {
            setRatio(img.naturalWidth / img.naturalHeight);
          }}
        />
      </div>
    </div>
  );
}
