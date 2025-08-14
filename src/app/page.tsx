'use client';

import { motion } from 'framer-motion';
import CtaButton from '@/components/CtaButton';
import dynamic from 'next/dynamic';

const InteractiveInterests = dynamic(() => import('@/components/InteractiveInterests'), {
  ssr: false,
  loading: () => <div className="h-screen bg-dark-charcoal" />, // Prevent layout shift
});

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

      <InteractiveInterests interests={interests} works={works} />
    </div>
  );
}
