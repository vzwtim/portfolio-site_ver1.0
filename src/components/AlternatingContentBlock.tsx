
import Image from 'next/image';
import React from 'react';

interface AlternatingContentBlockProps {
  imageSrc: string;
  title: string;
  description: string;
  isImageLeft: boolean;
}

const AlternatingContentBlock: React.FC<AlternatingContentBlockProps> = ({
  imageSrc,
  title,
  description,
  isImageLeft,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center my-8">
      {isImageLeft ? (
        <>
          <div className="w-full md:w-1/2 p-4">
            <Image src={imageSrc} alt={title} width={500} height={300} objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
          <div className="w-full md:w-1/2 p-4 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/2 p-4 text-center md:text-right">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Image src={imageSrc} alt={title} width={500} height={300} objectFit="cover" className="rounded-lg shadow-lg" />
          </div>
        </>
      )}
    </div>
  );
};

export default AlternatingContentBlock;
