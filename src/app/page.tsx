'use client';

import Image from "next/image";
import { useRef } from 'react';
import { motion } from 'framer-motion';
import CtaButton from '@/components/CtaButton';
import SectionWrapper from '@/components/SectionWrapper';
import DigitalCard from '@/components/DigitalCard';
import useIsMobile from '@/hooks/useIsMobile';

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

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      {/* New Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-main-green text-white">
        <motion.div
          className="absolute inset-0 bg-main-green z-0"
          initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
          animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 text-center px-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            ブランドメッセージ
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            サブコピーをここに配置します。最大2行までの簡潔な説明です。
          </p>
          <CtaButton>
            お問い合わせ
          </CtaButton>
        </motion.div>
      </section>

      <SectionWrapper
        clipPath="diagonal-top"
        className="bg-main-red-dark text-white py-20 px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              空間と創造
            </h2>
            <div className="w-24 h-px bg-white mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {interests.spaceAndCreation.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={interest.imageUrl}
                    alt={interest.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-main-green/70 group-hover:opacity-0 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {interest.title}
                </h3>
                <p className="text-base opacity-90 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Restyled Related Works */}
          <div className="mt-24">
            <h3 className="text-3xl font-bold mb-12 text-center">
              関連作品
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {works.filter(work => ['建築', 'デザイン'].includes(work.category)).map((work, index) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer bg-white/10 p-6 rounded-lg"
                >
                  <div className="relative h-56 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={work.imageUrl}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {work.title}
                  </h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {work.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        clipPath="diagonal-top"
        className="bg-main-red-dark text-white py-20 px-8 relative"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22100%22%20height%3D%22115.47%22%20viewBox%3D%220%200%20100%20115.47%22%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22rgba(255,255,255,0.05)%22%20stroke-width%3D%222%22%20d%3D%22M50%200v115.47M0%2028.87h100M0%2086.6h100M50%200L0%2028.87%200%2086.6l50%2028.87%2050-28.87V28.87L50%200zm0%2057.73L0%2086.6M50%2057.73l50%2028.87%22/%3E%3C/svg%3E')`,
          backgroundSize: '100px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              文化と探求
            </h2>
            <div className="w-24 h-px bg-white mx-auto"></div>
          </motion.div>

          <div className="flex flex-col items-center gap-16">
            {interests.cultureAndExploration.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="group w-full max-w-4xl"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                  <div className="relative w-full md:w-1/2 h-80 rounded-lg overflow-hidden">
                    <Image
                      src={interest.imageUrl}
                      alt={interest.title}
                      fill
                      className="object-cover transition-all duration-500 filter grayscale group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="writing-vertical-rl text-right h-64">
                      <h3 className="text-3xl font-bold mb-4">
                        {interest.title}
                      </h3>
                      <p className="text-lg opacity-90">
                        {interest.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        clipPath="diagonal-top"
        className="bg-main-green-dark text-white py-20 px-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A//www.w3.org/2000/svg'%20width%3D'20'%20height%3D'20'%3E%3Cpath%20d%3D'M10%200V20M0%2010H20'%20stroke%3D'rgba(255,255,255,0.05)'%20stroke-width%3D'1'/%3E%3C/svg%3E")`,
          backgroundSize: '20px',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              デジタル・開発
            </h2>
            <div className="w-24 h-px bg-white mx-auto"></div>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            {interests.digital.map((interest, index) => (
              <DigitalCard
                key={interest.title}
                iconUrl={interest.imageUrl} // The component uses a generic icon for now
                title={interest.title}
                description={interest.description}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
