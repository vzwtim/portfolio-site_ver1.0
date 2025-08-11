'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Photo {
  src: string;
  alt: string;
  filled: boolean;
  hovering?: boolean; // Add hovering state
  hoverTimeout?: NodeJS.Timeout; // Add hoverTimeout property
}

const initialPhotos: Photo[] = [
  { src: '/images/image_ginza_1.png', alt: 'Ginza 1', filled: false, hovering: false },
  { src: '/images/image_ginza_2.png', alt: 'Ginza 2', filled: false, hovering: false },
  { src: '/images/image_ginza_3.png', alt: 'Ginza 3', filled: false, hovering: false },
  { src: '/images/image_ginza_4.png', alt: 'Ginza 4', filled: false, hovering: false },
  { src: '/images/image_nishiogi.png', alt: 'Nishiogi', filled: false, hovering: false },
  { src: '/images/image_odo_1.jpeg', alt: 'Odo 1', filled: false, hovering: false },
  { src: '/images/image_odo_2.JPG', alt: 'Odo 2', filled: false, hovering: false },
  { src: '/images/image_odo_3.jpg', alt: 'Odo 3', filled: false, hovering: false },
  { src: '/images/image_odo_4.jpg', alt: 'Odo 4', filled: false, hovering: false },
  { src: '/images/image_sanriku_1.png', alt: 'Sanriku 1', filled: false, hovering: false },
  { src: '/images/image_sanriku_2.png', alt: 'Sanriku 2', filled: false, hovering: false },
  { src: '/images/image_sanriku_3.png', alt: 'Sanriku 3', filled: false, hovering: false },
  { src: '/images/image_sanriku_4.png', alt: 'Sanriku 4', filled: false, hovering: false },
  { src: '/images/image_sanriku_5.png', alt: 'Sanriku 5', filled: false, hovering: false },
  { src: '/images/image_sanriku_6.png', alt: 'Sanriku 6', filled: false, hovering: false },
  { src: '/images/image_sanriku_7.png', alt: 'Sanriku 7', filled: false, hovering: false },
];

export default function PhotosClientPage() {
  const [photos, setPhotos] = useState(initialPhotos);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    setPhotos(currentPhotos => {
      const newPhotos = [...currentPhotos];
      newPhotos[index].hovering = true; // Set hovering to true

      // Calculate cursor position relative to the image
      const rect = imageRefs.current[index]?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Store cursor position for clipPath origin
        // This would require adding x and y to the Photo interface
        // For now, we'll just use it to trigger the animation
      }

      if (!newPhotos[index].filled) {
        // Clear any existing timeout for this image
        if (newPhotos[index].hoverTimeout) {
          clearTimeout(newPhotos[index].hoverTimeout);
        }
        // Set a new timeout to mark as filled after 1 second
        newPhotos[index].hoverTimeout = setTimeout(() => {
          newPhotos[index].filled = true;
          newPhotos[index].hoverTimeout = undefined; // Clear timeout ID after it fires
          setPhotos([...newPhotos]); // Force re-render to update filled state
        }, 500);
      }
      return newPhotos;
    });
  };

  const handleMouseLeave = (index: number) => {
    setPhotos(currentPhotos => {
      const newPhotos = [...currentPhotos];
      newPhotos[index].hovering = false; // Set hovering to false
      // If the image is not yet filled, clear the timeout and revert to monochrome
      if (!newPhotos[index].filled && newPhotos[index].hoverTimeout) {
        clearTimeout(newPhotos[index].hoverTimeout);
        newPhotos[index].hoverTimeout = undefined; // Clear timeout ID
      }
      return newPhotos;
    });
  };

  return (
    <main className="bg-[#f7f7f7] text-[#232024] py-20 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-medium mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          Photos
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-px">
          {photos.map((photo, index) => (
            <div
              key={index}
              ref={el => { imageRefs.current[index] = el; }}
              className="relative aspect-square overflow-hidden"
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                layout="fill"
                objectFit="cover"
                className="grayscale"
              />
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: 'circle(0% at 50% 50%)' }}
                animate={{
                  clipPath: photo.filled || photo.hovering
                    ? 'circle(100% at 50% 50%)'
                    : 'circle(0% at 50% 50%)',
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}