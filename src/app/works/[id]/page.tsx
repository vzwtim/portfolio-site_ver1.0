
import React from 'react';
import { notFound } from 'next/navigation';
import worksData from '../../../../materials/works.json';
import Image from 'next/image';

interface WorkDetailPageProps {
  params: { id: string };
}

const WorkDetailPage: React.FC<WorkDetailPageProps> = ({ params }) => {
  const { id } = params;
  const work = worksData.find((w) => w.id === id);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-center">{work.title}</h1>
        <div className="relative w-full h-96 mb-8">
          <Image
            src={work.colorImage}
            alt={work.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-lg leading-relaxed mb-8">{work.description}</p>

        {/* More detailed content can go here */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <h2 className="text-3xl font-bold mb-4 mt-8">My Role & Contribution</h2>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
          <h2 className="text-3xl font-bold mb-4 mt-8">Technologies Used</h2>
          <ul>
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>React</li>
            <li>JavaScript/TypeScript</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailPage;
