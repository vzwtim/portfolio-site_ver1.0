'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface WorkDetailClientProps {
  workId: string;
  // You can pass other data fetched in the Server Component here
}

// Dummy data for a work item (moved from page.tsx)
const dummyWorkData = {
  title: '建築プロジェクトA',
  description: `
    このプロジェクトは、都市の持続可能性と居住者のウェルビーイングを両立させることを目指した革新的な建築設計です。
    自然光を最大限に取り入れ、風の流れを考慮したパッシブデザインを採用。
    地域社会との調和を重視し、公共スペースとプライベート空間の境界を曖昧にすることで、
    新たなコミュニティの形成を促します。
    使用された材料は、環境負荷の低いリサイクル可能な素材を中心に選定され、
    建設プロセス全体においてもCO2排出量の削減に貢献しています。
    また、最新のスマートホーム技術を導入し、エネルギー効率の最適化と居住者の快適性を追求しました。
    この建築は、単なる構造物ではなく、未来の都市生活のあり方を提案するものです。
  `,
  images: [
    '/images/image_ginza_1.png',
    '/images/image_ginza_2.png',
    '/images/image_ginza_3.png',
    '/images/image_ginza_4.png',
    '/images/building_osaka.jpg',
    '/images/drawing_plantbuilding.png',
  ],
};

const WorkDetailClient: React.FC<WorkDetailClientProps> = ({ workId }) => {
  const searchParams = useSearchParams();
  const dominantBgColor = searchParams.get('dominantBgColor') || '#101820'; // Default to dark charcoal

  return (
    <motion.div
      className="min-h-screen text-white"
      style={{ backgroundColor: dominantBgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        layoutId={`image-/works/${workId}`}
        className="fixed inset-0 z-0"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 0, scale: 1.2 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{ backgroundColor: dominantBgColor }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Column: Title and Description */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24">
          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold mb-8 tracking-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {dummyWorkData.title}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl leading-relaxed opacity-80"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {dummyWorkData.description}
          </motion.p>
        </div>

        {/* Right Column: Horizontal Scrolling Image Gallery */}
        <motion.div
          className="lg:w-1/2 flex items-center overflow-x-scroll snap-x snap-mandatory py-8 lg:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {dummyWorkData.images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-[90vw] lg:w-[80vw] h-[70vh] relative snap-center mx-4 rounded-lg overflow-hidden shadow-xl">
              <Image
                src={src}
                alt={`Work image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 80vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkDetailClient;
