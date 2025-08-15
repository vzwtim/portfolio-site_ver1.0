
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
}

const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  description,
  monochromeImage,
  colorImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/works/${id}`}>
      <div
        className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-64 overflow-hidden mb-4">
          <Image
            src={isHovered ? colorImage : monochromeImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        <div
          className="p-4 pt-8 bg-white"
        >
          <h2 className="text-2xl font-bold mb-2 text-gray-900">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default WorkCard;
