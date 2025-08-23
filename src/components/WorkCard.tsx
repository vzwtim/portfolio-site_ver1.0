
"use client";
import React from 'react';
import FadeInImage from './FadeInImage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface WorkCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  bgColor?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  description,
  image,
  tags = [],
  bgColor,
}) => {
  const router = useRouter();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = bgColor || '#fff';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.clipPath = `circle(0px at ${clientX}px ${clientY}px)`;
    overlay.style.transition = 'clip-path 0.6s ease-out';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(150vmax at ${clientX}px ${clientY}px)`;
    });
    setTimeout(() => {
      router.push(`/works/${id}`);
      setTimeout(() => {
        overlay.style.transition = 'clip-path 0.6s ease-in';
        overlay.style.clipPath = `circle(0px at ${clientX}px ${clientY}px)`;
        setTimeout(() => overlay.remove(), 600);
      }, 100);
    }, 600);
  };

  return (
    <div>
      <Link href={`/works/${id}`} onClick={handleClick}>
        <div className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer group">
          <div className="relative w-full aspect-video overflow-hidden">
            <FadeInImage
              src={image}
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
