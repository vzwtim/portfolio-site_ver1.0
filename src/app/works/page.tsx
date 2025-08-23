
import React from 'react';
import Link from 'next/link';
import WorkCard from '@/components/WorkCard';
import worksData from '../../../materials/works.json';
import { optimizedImage } from '@/lib/optimizedImage';

interface WorksPageProps {
  searchParams: { tag?: string };
}

const WorksPage: React.FC<WorksPageProps> = ({ searchParams }) => {
  const tag = searchParams?.tag;
  const filteredWorks = tag
    ? worksData.filter((work) => work.tags?.includes(tag))
    : worksData;
  const allTags = Array.from(
    new Set(worksData.flatMap((work) => work.tags || []))
  );
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-5xl font-extrabold mb-12 mt-24 text-center">
        Works{tag ? `: ${tag}` : ''}
      </h1>
      <div className="flex justify-center flex-wrap gap-4 mb-12">
        <Link
          href="/works"
          className={`px-4 py-2 rounded ${
            !tag
              ? 'bg-gray-900 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/works?tag=${t}`}
            className={`px-4 py-2 rounded ${
              tag === t
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            id={work.id}
            title={work.title}
            description={work.description}
            monochromeImage={optimizedImage(
              work.images?.[1] || work.monochromeImage
            )}
            colorImage={optimizedImage(work.images?.[0] || work.colorImage)}
            tags={work.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default WorksPage;
