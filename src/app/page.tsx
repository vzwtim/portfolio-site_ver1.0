'use client';

import Image from "next/image";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const InterestHero = dynamic(() => import("../components/InterestHero"), { ssr: false });

const interests = {
  spaceAndCreation: [
    { title: "不動産", description: "空間の価値を捉え、未来の可能性を創造する。", imageUrl: "/images/building_osaka.jpg" },
    { title: "建築", description: "機能と美が融合した、心地よい空間を追求する。", imageUrl: "/images/drawing_aris.jpg" },
    { title: "暮らし", description: "日々の営みを豊かにする、ささやかな工夫と発見。", imageUrl: "/images/kurashi.jpg" },
    { title: "製作", description: "手を動かし、思考を形にする創造の喜び。", imageUrl: "/images/me_mad.jpg" },
  ],
  cultureAndExploration: [
    { title: "写真", description: "光と影で切り取る、世界の美しい瞬間。", imageUrl: "/images/film_bw_29.jpg" },
    { title: "食", description: "文化、歴史、そして人との繋がりを味わう。", imageUrl: "/images/food_me_tomato.jpg" },
    { title: "盆栽", description: "小さな鉢の中に、大自然の縮図を育む。", imageUrl: "/images/bird.JPG" },
    { title: "書道", description: "墨と筆で描く、静寂と躍動の芸術。", imageUrl: "/images/syodo_ko.jpg" },
    { title: "旅", description: "未知の風景と文化に触れる、自己発見の冒険。", imageUrl: "/images/trip_kumano_3.jpg" },
  ],
  digital: [
    { title: "プログラミング", description: "論理と創造で、デジタル世界を構築する。", imageUrl: "/images/figure_master.webp" },
    { title: "Webデザイン", description: "美しさと使いやすさを追求し、情報を最適に届ける。", imageUrl: "/images/web_pavillion.PNG" },
    { title: "データ分析", description: "数字の裏に隠された意味を読み解き、未来を予測する。", imageUrl: "/images/ai_girl_1.png" },
  ]
};



const interestColors = [
  { bg: 'bg-white', text: 'text-[#232024]' }, // White, Dark charcoal gray
  { bg: 'bg-gray-50', text: 'text-[#232024]' }, // Light gray, Dark charcoal gray
  { bg: 'bg-gray-100', text: 'text-[#232024]' }, // Gray, Dark charcoal gray
  { bg: 'bg-white', text: 'text-[#232024]' }, // White, Dark charcoal gray
];

export default function Home() {
  const sectionRefs = useRef<HTMLDivElement[]>([]); // To store refs of all interest item sections

  let globalIndex = 0; // To keep track of the overall index for color cycling

  return (
    <div className="min-h-screen">
      {/* Hero Section with Japanese Aesthetic */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
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
        <motion.div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          {/* Main Catchphrase - Simple and Clean */}
          <div className="flex justify-center items-center">
            <h1 className="text-white text-4xl md:text-6xl font-light tracking-wider" style={{ fontFamily: '"Shippori Mincho", serif' }}>
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

      {/* Interests Section with interactive hero */}
      <section className="bg-white text-[#232024]">
        <InterestHero />
        <div className="py-20 px-8 max-w-7xl mx-auto">
          {/* Space and Creation */}
          <div className="mb-32">
            <h3 className="text-2xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              空間と創造
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {interests.spaceAndCreation.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  ref={(el) => {
                    if (el) sectionRefs.current[globalIndex] = el;
                  }}
                  data-index={globalIndex++}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 mb-4 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={interest.imageUrl}
                      alt={interest.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.title}
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            
          </div>

          {/* Culture and Exploration */}
          <div className="mb-32">
            <h3 className="text-2xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              文化と探求
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
              {interests.cultureAndExploration.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  ref={(el) => {
                    if (el) sectionRefs.current[globalIndex] = el;
                  }}
                  data-index={globalIndex++}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={interest.imageUrl}
                      alt={interest.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.title}
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            
          </div>

          {/* Digital */}
          <div className="mb-32">
            <h3 className="text-2xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              でじたる
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {interests.digital.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  ref={(el) => {
                    if (el) sectionRefs.current[globalIndex] = el;
                  }}
                  data-index={globalIndex++}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg border border-gray-200">
                    <Image
                      src={interest.imageUrl}
                      alt={interest.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.title}
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            
          </div>
        </div>
      </section>
      
    </div>
  );
}