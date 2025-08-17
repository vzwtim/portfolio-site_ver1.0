// src/app/works/[id]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import works from '../../../../materials/works.json';
import WorkContent from './WorkContent';
import type { Work } from './WorkContent';

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

  return <WorkContent work={work} images={images} />;
}

