
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkCardProps {
  id: string;
  title: string;
  description: string;
  monochromeImage: string;
  colorImage: string;
  tags?: string[];
}

const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  description,
  monochromeImage,
  colorImage,
  tags = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <Link href={`/works/${id}`}>
        <div
          className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={isHovered ? colorImage : monochromeImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
          </div>
        </div>
      </Link>
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
        <p className="text-gray-700">{description}</p>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/works?tag=${tag}`}
                className="text-sm text-blue-600 hover:underline"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
