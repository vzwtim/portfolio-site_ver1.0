'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollbarWidth } from '@/context/ScrollbarWidthContext';

interface Photo {
  src: string;
  alt: string;
  dominantBgColor: string; // Background color for modal
}

const initialPhotos: Photo[] = [
  { src: '/images/trip_eu_1.jpg', alt: 'Europe Trip 1', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_eu_2.jpg', alt: 'Europe Trip 2', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_eu_3.jpg', alt: 'Europe Trip 3', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_eu_4.jpg', alt: 'Europe Trip 4', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_eu_5.jpg', alt: 'Europe Trip 5', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_japan_1.jpg', alt: 'Japan Trip 1', dominantBgColor: '#FFD700' },
  { src: '/images/trip_japan_10.jpg', alt: 'Japan Trip 10', dominantBgColor: '#FFD700' },
  { src: '/images/trip_kumano_1.jpg', alt: 'Kumano Trip 1', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_2.jpg', alt: 'Kumano Trip 2', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_3.jpg', alt: 'Kumano Trip 3', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_4.jpg', alt: 'Kumano Trip 4', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_5.jpg', alt: 'Kumano Trip 5', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_6.jpg', alt: 'Kumano Trip 6', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kyoto.JPG', alt: 'Kyoto Trip', dominantBgColor: '#800080' },
  { src: '/images/trip_snow.jpg', alt: 'Snowy Trip', dominantBgColor: '#F0F8FF' },
  { src: '/images/trip_tokaido_1.jpg', alt: 'Tokaido Trip 1', dominantBgColor: '#FF6347' },
  { src: '/images/trip_tokaido_2.jpg', alt: 'Tokaido Trip 2', dominantBgColor: '#FF6347' },
  { src: '/images/trip_tokaido_3.jpg', alt: 'Tokaido Trip 3', dominantBgColor: '#FF6347' },
  { src: '/images/trip_tokaido_4.jpg', alt: 'Tokaido Trip 4', dominantBgColor: '#FF6347' },
  { src: '/images/trip_tokaido_5.jpg', alt: 'Tokaido Trip 5', dominantBgColor: '#FF6347' },
  { src: '/images/trip_usa_1.jpg', alt: 'USA Trip 1', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_2.jpg', alt: 'USA Trip 2', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_3.jpg', alt: 'USA Trip 3', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_4.jpg', alt: 'USA Trip 4', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_5.jpg', alt: 'USA Trip 5', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_6.jpg', alt: 'USA Trip 6', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_7.jpg', alt: 'USA Trip 7', dominantBgColor: '#4682B4' },
  { src: '/images/trip_usa_8.jpg', alt: 'USA Trip 8', dominantBgColor: '#4682B4' },
  { src: '/images/film_bw_1.jpg', alt: 'B&W Film 1', dominantBgColor: '#232024' },
  { src: '/images/film_bw_2.jpg', alt: 'B&W Film 2', dominantBgColor: '#232024' },
  { src: '/images/film_bw_3.jpg', alt: 'B&W Film 3', dominantBgColor: '#232024' },
  { src: '/images/film_bw_4.jpg', alt: 'B&W Film 4', dominantBgColor: '#232024' },
  { src: '/images/film_bw_5.jpg', alt: 'B&W Film 5', dominantBgColor: '#232024' },
  { src: '/images/film_bw_6.jpg', alt: 'B&W Film 6', dominantBgColor: '#232024' },
  { src: '/images/film_bw_7.jpg', alt: 'B&W Film 7', dominantBgColor: '#232024' },
  { src: '/images/film_bw_8.jpg', alt: 'B&W Film 8', dominantBgColor: '#232024' },
  { src: '/images/film_bw_9.jpg', alt: 'B&W Film 9', dominantBgColor: '#232024' },
  { src: '/images/film_bw_10.jpg', alt: 'B&W Film 10', dominantBgColor: '#232024' },
  { src: '/images/film_bw_11.jpg', alt: 'B&W Film 11', dominantBgColor: '#232024' },
  { src: '/images/film_color_1.jpg', alt: 'Color Film 1', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_2.jpg', alt: 'Color Film 2', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_3.jpg', alt: 'Color Film 3', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_4.jpg', alt: 'Color Film 4', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_5.jpg', alt: 'Color Film 5', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_6.jpg', alt: 'Color Film 6', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_7.jpg', alt: 'Color Film 7', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_8.jpg', alt: 'Color Film 8', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_9.jpg', alt: 'Color Film 9', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_10.jpg', alt: 'Color Film 10', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_11.jpg', alt: 'Color Film 11', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_12.jpg', alt: 'Color Film 12', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_13.jpg', alt: 'Color Film 13', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_14.jpg', alt: 'Color Film 14', dominantBgColor: '#32CD32' },
  { src: '/images/film_color_15.jpg', alt: 'Color Film 15', dominantBgColor: '#32CD32' },
];

export default function PhotosClientPage() {
  const { scrollbarWidth } = useScrollbarWidth();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const updateSliderWidth = () => {
      if (sliderContainerRef.current) {
        setSliderWidth(sliderContainerRef.current.offsetWidth);
      }
    };

    updateSliderWidth();

    window.addEventListener('resize', updateSliderWidth);

    return () => {
      window.removeEventListener('resize', updateSliderWidth);
    };
  }, [selectedPhotoIndex]);


    const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const goToNextPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prevIndex) => {
        if (prevIndex === null) return 0; // If somehow null, go to first photo
        return (prevIndex + 1) % initialPhotos.length;
      });
    }
  }, [selectedPhotoIndex]);

  const goToPrevPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prevIndex) => {
        if (prevIndex === null) return initialPhotos.length - 1; // If somehow null, go to last photo
        return prevIndex === 0 ? initialPhotos.length - 1 : prevIndex - 1;
      });
    }
  }, [selectedPhotoIndex]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (selectedPhotoIndex !== null) {
      if (event.key === 'ArrowRight') {
        goToNextPhoto();
      } else if (event.key === 'ArrowLeft') {
        goToPrevPhoto();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    }
  }, [selectedPhotoIndex, goToNextPhoto, goToPrevPhoto, closeModal]);

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhotoIndex, scrollbarWidth, handleKeyDown]);

  const currentPhoto = selectedPhotoIndex !== null ? initialPhotos[selectedPhotoIndex] : null;
  const slideWidth = sliderWidth * 0.8;
  const gap = sliderWidth * 0.1;

  return (
    <main className="bg-[#f7f7f7] text-[#232024] py-20 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-full mx-auto">
        <h1 className="text-4xl font-medium mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          Photos
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-px">
          {initialPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden cursor-pointer"
              onClick={() => openModal(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={300}
                quality={50}
                priority={index < 8}
                                className="object-cover w-full h-full filter grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backgroundColor: hexToRgba(currentPhoto.dominantBgColor, 0.8) }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000]"
            onClick={closeModal}
            transition={{ backgroundColor: { duration: 1.0, ease: "linear" } }}
          >
            <div
              ref={sliderContainerRef}
              className="relative w-full h-full overflow-visible"
            >
              <motion.div
                className="flex h-full items-center"
                initial={{ x: -(selectedPhotoIndex * (slideWidth + gap)) + (sliderWidth - slideWidth) / 2 }}
                animate={{ x: -(selectedPhotoIndex * (slideWidth + gap)) + (sliderWidth - slideWidth) / 2 }}
                transition={{ type: 'tween', duration: 0.5 }}
              >
                {initialPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center transition-all duration-500"
                    style={{
                      width: slideWidth,
                      marginRight: gap,
                      opacity: index === selectedPhotoIndex ? 1 : 0.3,
                      transform: `scale(${index === selectedPhotoIndex ? 1 : 0.8})`,
                    }}
                  >
                    <div className="relative w-auto h-[80vh] rounded-lg overflow-hidden flex items-center justify-center">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={1600}
                        height={1200}
                        quality={75}
                        className="object-contain w-auto h-full"
                      />
                      <div className="absolute bottom-0 left-0 p-4" style={{ color: '#232024' }}>
                        <h2 className="text-xl font-semibold" style={{ fontFamily: '"Shippori Mincho", serif' }}>{photo.alt}</h2>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
