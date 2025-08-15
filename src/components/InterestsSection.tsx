'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const interests = {
  spaceAndCreation: [
    { title: '不動産', description: '空間の価値を捉え、未来の可能性を創造する。', imageUrl: '/images/building_osaka.jpg' },
    { title: '建築', description: '機能と美が融合した、心地よい空間を追求する。', imageUrl: '/images/drawing_aris.jpg' },
    { title: '暮らし', description: '日々の営みを豊かにする、ささやかな工夫と発見。', imageUrl: '/images/kurashi.jpg' },
    { title: '製作', description: '手を動かし、思考を形にする創造の喜び。', imageUrl: '/images/me_mad.jpg' },
  ],
  cultureAndExploration: [
    { title: '写真', description: '光と影で切り取る、世界の美しい瞬間。', imageUrl: '/images/film_bw_29.jpg' },
    { title: '食', description: '文化、歴史、そして人との繋がりを味わう。', imageUrl: '/images/food_me_tomato.jpg' },
    { title: '盆栽', description: '小さな鉢の中に、大自然の縮図を育む。', imageUrl: '/images/bird.JPG' },
    { title: '書道', description: '墨と筆で描く、静寂と躍動の芸術。', imageUrl: '/images/syodo_ko.jpg' },
    { title: '旅', description: '未知の風景と文化に触れる、自己発見の冒険。', imageUrl: '/images/trip_kumano_3.jpg' },
  ],
  digital: [
    {
      title: 'プログラミング',
      description: '論理と創造で、デジタル世界を構築する。',
      imageUrl: '/images/figure_master.webp',
    },
    {
      title: 'Webデザイン',
      description: '美しさと使いやすさを追求し、情報を最適に届ける。',
      imageUrl: '/images/web_pavillion.PNG',
    },
    {
      title: 'データ分析',
      description: '数字の裏に隠された意味を読み解き、未来を予測する。',
      imageUrl: '/images/ai_girl_1.png',
    },
  ],
};

type ThemeKey = 'spaceAndCreation' | 'cultureAndExploration' | 'digital';

const themes: Record<ThemeKey, { className: string; style?: React.CSSProperties }> = {
  spaceAndCreation: {
    className: 'bg-green-50 text-green-900',
  },
  cultureAndExploration: {
    className: 'text-red-900',
    style: {
      backgroundColor: '#ffe4e6',
      backgroundImage:
        'repeating-linear-gradient(45deg,#ffffff 0,#ffffff 25px,#fecaca 25px,#fecaca 50px)',
    },
  },
  digital: {
    className: 'text-green-300',
    style: {
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(#22c55e40 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
  },
};

export default function InterestsSection() {
  const [theme, setTheme] = useState<ThemeKey>('spaceAndCreation');
  const spaceRef = useRef(null);
  const cultureRef = useRef(null);
  const digitalRef = useRef(null);

  const spaceInView = useInView(spaceRef, { amount: 0.6 });
  const cultureInView = useInView(cultureRef, { amount: 0.6 });
  const digitalInView = useInView(digitalRef, { amount: 0.6 });

  useEffect(() => {
    if (spaceInView) {
      setTheme('spaceAndCreation');
    } else if (cultureInView) {
      setTheme('cultureAndExploration');
    } else if (digitalInView) {
      setTheme('digital');
    }
  }, [spaceInView, cultureInView, digitalInView]);

  const current = themes[theme];

  const renderCards = (items: typeof interests.spaceAndCreation) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((interest) => (
        <motion.div
          key={interest.title}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
            <Image
              src={interest.imageUrl}
              alt={interest.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
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
  );

  return (
    <div
      className={`transition-colors duration-700 ease-out ${current.className}`}
      style={current.style}
    >
      {/* Space and Creation */}
      <section ref={spaceRef} className="min-h-screen flex flex-col justify-center px-8">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          興味・関心
        </motion.h3>
        {renderCards(interests.spaceAndCreation)}
      </section>

      {/* Culture and Exploration */}
      <section ref={cultureRef} className="min-h-screen flex flex-col justify-center px-8">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          文化と探求
        </motion.h3>
        {renderCards(interests.cultureAndExploration)}
      </section>

      {/* Digital */}
      <section ref={digitalRef} className="min-h-screen flex flex-col justify-center px-8">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          でじたる
        </motion.h3>
        {renderCards(interests.digital)}
      </section>
    </div>
  );
}

