"use client";
import React from 'react';
import FadeInImage from './FadeInImage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface WorkCardProps {
  id: string;
  title: string;
  image: string;
  tags?: string[];
  bgColor?: string;
}

const WorkCard: React.FC<WorkCardProps> = ({
  id,
  title,
  image,
  tags = [],
  bgColor,
}) => {
  const router = useRouter();

  const isJapanese = /[\u3000-\u303F\u3040-\u30FF\u4E00-\u9FFF]/.test(
    title
  );

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
      setTimeout(() => overlay.remove(), 700);
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
        <h2
          className="text-2xl font-bold mb-2 text-gray-900"
          style={
            isJapanese ? { fontFamily: '"Shippori Mincho", serif' } : undefined
          }
        >
          {title}
        </h2>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/works?tag=${tag}`}
                className="text-sm text-[#008877] hover:underline"
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