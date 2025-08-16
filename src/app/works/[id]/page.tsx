// src/app/works/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import works from '../../../../materials/works.json';

type Work = {
  id: string;
  title: string;
  description: string;
  monochromeImage: string;
  colorImage: string;
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

  return (
    <main
      className="min-h-screen text-gray-900"
      style={{ backgroundColor: work.bgColor }}
    >
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6">{work.title}</h1>
          <p className="text-lg leading-relaxed">{work.description}</p>
        </div>
        <div className="flex-1 relative w-full h-96">
          <Image
            src={work.colorImage}
            alt={work.title}
            fill
            className="object-cover rounded-lg shadow-lg"
          />
          <div className="hidden md:block absolute -left-10 bottom-0 w-40 h-40">
            <Image
              src={work.monochromeImage}
              alt=""
              fill
              className="object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

