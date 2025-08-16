
import React from 'react';
import WorkCard from '@/components/WorkCard';
import worksData from '../../../materials/works.json';

interface WorksPageProps {
  searchParams?: { tag?: string };
}

const WorksPage: React.FC<WorksPageProps> = ({ searchParams }) => {
  const tag = searchParams?.tag;
  const filteredWorks = tag
    ? worksData.filter((work) => work.tags && work.tags.includes(tag))
    : worksData;
  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-5xl font-extrabold mb-12 mt-24 text-center">
        Works{tag ? `: ${tag}` : ''}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            id={work.id}
            title={work.title}
            description={work.description}
            monochromeImage={work.monochromeImage}
            colorImage={work.colorImage}
          />
        ))}
      </div>
    </div>
  );
};

export default WorksPage;
