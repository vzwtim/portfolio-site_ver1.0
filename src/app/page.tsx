'use client';



import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import InterestsSection from "../components/InterestsSection";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Parallax for hero section background
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Parallax for hero section text
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Japanese Aesthetic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/mv_gomoku_1.jpg"
            alt="Gomoku Rice"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-center px-8 max-w-6xl mx-auto"
        >
          {/* Main Catchphrase - Simple and Clean */}
          <div className="flex justify-center items-center">
            <h1
              className="text-white text-4xl md:text-6xl font-light tracking-wider"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              ぼくは、五目飯。
            </h1>
          </div>
        </motion.div>
      </section>

      {/* About Section with Japanese Aesthetic */}
      <section className="py-20 px-8 bg-gray-50 text-[#232024]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              空間と創造の探求者
            </h2>
            <div className="w-24 h-px bg-[#232024] mx-auto mb-8"></div>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              建築の美しさと技術の可能性を融合させ、新しい価値を創造することを目指しています。
              伝統的な和の精神と現代的な技術を組み合わせ、人々の暮らしを豊かにする空間を設計します。
        </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Interests Section */}
      <InterestsSection />
      
    </div>
  );
}