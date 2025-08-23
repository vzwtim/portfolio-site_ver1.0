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
  const predefinedTags = ['living', 'architecture'];
  const allTags = Array.from(
    new Set([
      ...predefinedTags,
      ...worksData.flatMap((work) => work.tags || [])
    ])
  );
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-5xl font-extrabold mb-12 mt-24 text-center">
        Works{tag ? `: ${tag}` : ''}
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <Link
          href="/works"
          className={`px-2 py-1 text-sm rounded border transition-colors ${
            !tag
              ? 'bg-gray-700 text-white border-gray-700'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/works?tag=${t}`}
            className={`px-2 py-1 text-sm rounded border transition-colors ${
              tag === t
                ? 'bg-gray-700 text-white border-gray-700'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
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
            image={optimizedImage(
              work.images?.[0] || work.colorImage || work.monochromeImage
            )}
            tags={work.tags}
            bgColor={work.bgColor}
          />
        ))}
      </div>
    </div>
  );
};

export default WorksPage;
