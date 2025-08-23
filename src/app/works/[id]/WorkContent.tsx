// src/app/works/[id]/WorkContent.tsx
'use client';

import FadeInImage from '@/components/FadeInImage';
import BackButton from '@/components/BackButton';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';

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

  return (
    <main
      ref={scrollRef}
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
          <FadeInImage src={src} alt={idx === 0 ? work.title : ''} fill className="object-cover" />
        </div>
      ))}
    </main>
  );
}
