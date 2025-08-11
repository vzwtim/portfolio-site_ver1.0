import Link from 'next/link';
import Image from 'next/image';

const works = [
  {
    title: '建築プロジェクトA',
    description: '都市に開かれた、光と緑の集合住宅の設計。',
    image: '/images/mv_ginza.png',
    href: '/works/project-a',
  },
  {
    title: '研究：不良住宅',
    description: '都市の隙間に生まれる非公式な居住空間の研究。',
    image: '/images/map_bachelor_1.png',
    href: '/works/research-bad-housing',
  },
  {
    title: 'プロダクトデザイン',
    description: 'ミニマルな生活に寄り添う家具のデザイン。',
    image: '/images/figure_master_1.png',
    href: '/works/product-design',
  },
  {
    title: '書道アート',
    description: '伝統的な書と現代的な空間の融合。',
    image: '/images/mv_tea_2.jpg',
    href: '/works/shodo-art',
  },
  {
    title: '写真作品集',
    description: '日常の風景を切り取った写真作品。',
    image: '/images/image_ginza_2.png',
    href: '/works/photo-collection',
  },
  {
    title: '盆栽の記録',
    description: '盆栽の育成記録と作品紹介。',
    image: '/images/sakura.svg',
    href: '/works/bonsai-record',
  },
];

export default function WorksPage() {
  return (
    <main className="bg-[#f7f7f7] text-[#232024] py-20 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          作品
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, index) => (
            <Link key={index} href={work.href}>
              <div className="border border-gray-200/80 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white/50">
                <div className="relative w-full h-60">
                  <Image src={work.image} alt={work.title} layout="fill" objectFit="cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>{work.title}</h2>
                  <p className="text-base text-gray-600" style={{ fontFamily: '"Shippori Mincho", serif' }}>{work.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}