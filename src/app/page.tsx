'use client';

import FadeInImage from "@/components/FadeInImage";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import InterestsSection from "../components/InterestsSection";

export default function Home() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

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
          <FadeInImage
            src="/images/mv_gomoku_1_mobile.jpg"
            alt="Gomoku Rice"
            fill
            className="block md:hidden object-cover"
            loading="eager"
            sizes="100vw"
          />
          <FadeInImage
            src="/images/mv_gomoku_1.jpg"
            alt="Gomoku Rice"
            fill
            className="hidden md:block object-cover"
            loading="eager"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20 md:bg-black/40" />
        </motion.div>
        
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 px-4 md:px-20 pt-0 md:pt-0 max-w-6xl mx-auto flex justify-center items-center text-center"
        >
          {/* Main Catchphrase - Simple and Clean */}
          <h1
            className="text-white text-3xl sm:text-5xl md:text-6xl font-light tracking-normal md:tracking-wider whitespace-pre-line text-center"
            style={{ fontFamily: '"Shippori Mincho", serif' }}
          >
            ぼくは、五目飯。
          </h1>
        </motion.div>
      </section>

      {/* About Section with Japanese Aesthetic */}
      <section className="py-20 px-4 md:px-20 bg-gray-50 text-[#232024]">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-24 h-px bg-[#232024] mx-auto mb-8"></div>
            <p className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              ひとつに絞れない。<br />
              空間も、仕組みも、体験も。<br />
              いろんなことに手を出しちゃう。<br />
              気づくとアレンジも加えてる。<br />
              でも最後は、ちゃんとおいしくなる。<br />
              それが僕のつくり方。</p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Interests Section */}
      <InterestsSection />
      
    </div>
  );
}
