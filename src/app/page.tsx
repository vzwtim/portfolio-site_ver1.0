'use client';

import WorksScroll from "@/components/WorksScroll";

import Image from "next/image";
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const interests = {
  spaceAndCreation: [
    { title: "不動産", description: "空間の価値を捉え、未来の可能性を創造する。", imageUrl: "/images/image_ginza_1.png" },
    { title: "建築", description: "機能と美が融合した、心地よい空間を追求する。", imageUrl: "/images/image_odo_1.jpeg" },
    { title: "暮らし", description: "日々の営みを豊かにする、ささやかな工夫と発見。", imageUrl: "/images/image_nishiogi.png" },
    { title: "製作", description: "手を動かし、思考を形にする創造の喜び。", imageUrl: "/images/drawing_plantbuilding.png" },
  ],
  cultureAndExploration: [
    { title: "写真", description: "光と影で切り取る、世界の美しい瞬間。", imageUrl: "/images/image_odo_2.JPG" },
    { title: "食", description: "文化、歴史、そして人との繋がりを味わう。", imageUrl: "/images/gomoku-meshi.jpg" },
    { title: "盆栽", description: "小さな鉢の中に、大自然の縮図を育む。", imageUrl: "/images/sakura.svg" },
    { title: "書道", description: "墨と筆で描く、静寂と躍動の芸術。", imageUrl: "/images/mv_tea_2.jpg" },
    { title: "旅", description: "未知の風景と文化に触れる、自己発見の冒険。", imageUrl: "/images/image_sanriku_1.png" },
  ],
  digital: [
    { title: "プログラミング", description: "論理と創造で、デジタル世界を構築する。", imageUrl: "/materials/images/top.jpg" },
    { title: "Webデザイン", description: "美しさと使いやすさを追求し、情報を最適に届ける。", imageUrl: "/materials/images/top.jpg" },
    { title: "データ分析", description: "数字の裏に隠された意味を読み解き、未来を予測する。", imageUrl: "/materials/images/top.jpg" },
  ]
};

const works = [
  {
    id: 1,
    title: "建築プロジェクトA",
    description: "都市に開かれた、光と緑の集合住宅。",
    imageUrl: "/images/mv_ginza.png",
    link: "/works/project-a",
    category: "建築"
  },
  {
    id: 2,
    title: "研究：不良住宅",
    description: "都市の隙間に生まれる非公式な居住空間の研究。",
    imageUrl: "/images/map_bachelor_1.png",
    link: "/works/research-bad-housing",
    category: "研究"
  },
  {
    id: 3,
    title: "プロダクトデザイン",
    description: "ミニマルな生活に寄り添う家具のデザイン。",
    imageUrl: "/images/figure_master_1.png",
    link: "/works/product-design",
    category: "デザイン"
  },
  {
    id: 4,
    title: "書道アート",
    description: "伝統的な書と現代的な空間の融合。",
    imageUrl: "/images/mv_tea_2.jpg",
    link: "/works/shodo-art",
    category: "アート"
  },
  {
    id: 5,
    title: "Webアプリケーション",
    description: "ユーザビリティを重視したWebアプリの開発。",
    imageUrl: "/materials/images/top.jpg",
    link: "/works/web-app",
    category: "プログラミング"
  },
  {
    id: 6,
    title: "写真集：都市の表情",
    description: "都市の日常を切り取った写真作品集。",
    imageUrl: "/images/image_ginza_2.png",
    link: "/works/urban-photography",
    category: "写真"
  }
];

const interestColors = [
  { bg: 'bg-white', text: 'text-[#232024]' }, // White, Dark charcoal gray
  { bg: 'bg-gray-50', text: 'text-[#232024]' }, // Light gray, Dark charcoal gray
  { bg: 'bg-gray-100', text: 'text-[#232024]' }, // Gray, Dark charcoal gray
  { bg: 'bg-white', text: 'text-[#232024]' }, // White, Dark charcoal gray
];

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Parallax for hero section background
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Parallax for hero section text
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const sectionRefs = useRef<HTMLDivElement[]>([]); // To store refs of all interest item sections

  let globalIndex = 0; // To keep track of the overall index for color cycling

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
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-center px-8 max-w-6xl mx-auto"
        >
          {/* Main Catchphrase - Simple and Clean */}
          <div className="flex justify-center items-center">
            <h1 className="text-white text-4xl md:text-6xl font-light tracking-wider" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              ぼくは、五目飯。
            </h1>
          </div>
        </motion.div>
      </section>

      {/* About Section with Japanese Aesthetic */}
      <section className="py-20 px-8 bg-gray-50">
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

      {/* Extended Interests and Works Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              興味・関心と作品
            </h2>
            <div className="w-24 h-px bg-[#232024] mx-auto"></div>
          </motion.div>
          
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
            
            {/* Related Works */}
            <div className="mt-16">
              <h4 className="text-xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                関連作品
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.filter(work => ['建築', 'デザイン'].includes(work.category)).map((work, index) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={work.imageUrl}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h5 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.title}
                    </h5>
                    <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.description}
                    </p>
                  </motion.div>
                ))}
              </div>
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
            
            {/* Related Works */}
            <div className="mt-16">
              <h4 className="text-xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                関連作品
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.filter(work => ['アート', '写真'].includes(work.category)).map((work, index) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={work.imageUrl}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h5 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.title}
                    </h5>
                    <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.description}
                    </p>
                  </motion.div>
                ))}
              </div>
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
            
            {/* Related Works */}
            <div className="mt-16">
              <h4 className="text-xl font-semibold mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                関連作品
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.filter(work => ['プログラミング'].includes(work.category)).map((work, index) => (
                  <motion.div
                    key={work.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={work.imageUrl}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h5 className="text-lg font-semibold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.title}
                    </h5>
                    <p className="text-sm opacity-80 leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                      {work.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
