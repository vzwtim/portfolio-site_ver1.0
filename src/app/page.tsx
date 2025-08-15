'use client';



import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import InterestsSection from "../components/InterestsSection";
import dynamic from 'next/dynamic';

const CultureSection = dynamic(() => import('../components/CultureSection'), { ssr: false });

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

      <CultureSection />

      {/* Interactive Interests Section */}
      <InterestsSection />
      
    </div>
  );
}