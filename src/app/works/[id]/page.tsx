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
      className="flex h-screen w-screen overflow-x-auto overflow-y-hidden text-gray-900 snap-x snap-mandatory"
      style={{ backgroundColor: work.bgColor }}
    >
      <section className="flex-shrink-0 w-screen h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-6">{work.title}</h1>
          <p className="text-lg leading-relaxed">{work.description}</p>
        </div>
      </section>
      <section className="flex-shrink-0 w-screen h-screen relative">
        <Image src={work.colorImage} alt={work.title} fill className="object-cover" />
      </section>
      <section className="flex-shrink-0 w-screen h-screen relative">
        <Image src={work.monochromeImage} alt="" fill className="object-cover" />
      </section>
    </main>
  );
}

