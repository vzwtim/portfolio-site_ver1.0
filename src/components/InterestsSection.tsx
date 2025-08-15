'use client';

import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const interests = {
  spaceAndCreation: [
    {
      title: 'Real Estate',
      description: '空間の価値を捉え、未来の可能性を創造する。',
      imageUrl: '/images/building_osaka.jpg',
    },
    {
      title: 'Architecture',
      description: '機能と美が融合した、心地よい空間を追求する。',
      imageUrl: '/images/drawing_aris.jpg',
    },
    {
      title: 'Living',
      description: '日々の営みを豊かにする、ささやかな工夫と発見。',
      imageUrl: '/images/kurashi.jpg',
    },
    {
      title: 'Crafting',
      description: '手を動かし、思考を形にする創造の喜び。',
      imageUrl: '/images/me_mad.jpg',
    },
  ],
  cultureAndExploration: [
    {
      title: 'Photography',
      description: '光と影で切り取る、世界の美しい瞬間。',
      imageUrl: '/images/film_bw_29.jpg',
    },
    {
      title: 'Food',
      description: '文化、歴史、そして人との繋がりを味わう。',
      imageUrl: '/images/food_me_tomato.jpg',
    },
    {
      title: 'Bonsai',
      description: '小さな鉢の中に、大自然の縮図を育む。',
      imageUrl: '/images/bird.JPG',
    },
    {
      title: 'Calligraphy',
      description: '墨と筆で描く、静寂と躍動の芸術。',
      imageUrl: '/images/syodo_ko.jpg',
    },
    {
      title: 'Travel',
      description: '未知の風景と文化に触れる、自己発見の冒険。',
      imageUrl: '/images/trip_kumano_3.jpg',
    },
  ],
  digital: [
    {
      title: 'Programming',
      description: '論理と創造で、デジタル世界を構築する。',
      imageUrl: '/images/figure_master.webp',
    },
    {
      title: 'Web Design',
      description: '美しさと使いやすさを追求し、情報を最適に届ける。',
      imageUrl: '/images/web_pavillion.PNG',
    },
    {
      title: 'Data Analysis',
      description: '数字の裏に隠された意味を読み解き、未来を予測する。',
      imageUrl: '/images/ai_girl_1.png',
    },
  ],
};

type ThemeKey = 'spaceAndCreation' | 'cultureAndExploration' | 'digital';

const themes: Record<ThemeKey, { className: string; style?: React.CSSProperties }> = {
  spaceAndCreation: {
   className: 'text-black',
    style: { backgroundColor: '#f0fff8' },

  },
  cultureAndExploration: {
    className: 'text-black',
    style: {
      backgroundColor: '#ffffff',
      backgroundImage: 'url("/images/asanoha.svg")',
      backgroundSize: '40px 40px',
      backgroundRepeat: 'repeat',
    },
  },
  digital: {
    className: 'text-black',
    style: {
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(#22c55e40 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
  },
};

export default function InterestsSection() {
  const [theme, setTheme] = useState<ThemeKey>('spaceAndCreation');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spaceRef = useRef(null);
  const cultureRef = useRef(null);
  const digitalRef = useRef(null);

  const spaceInView = useInView(spaceRef, { amount: 0.6 });
  const cultureInView = useInView(cultureRef, { amount: 0.6 });
  const digitalInView = useInView(digitalRef, { amount: 0.6 });

const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

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

  const renderAlternatingCards = (items: typeof interests.spaceAndCreation) => (
    <div className="flex flex-col gap-40">
      {items.map((interest, index) => (
        <motion.div
          key={interest.title}
          className={`flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24 ${
            index % 2 !== 0 ? 'md:flex-row-reverse' : ''
          }`}

          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`w-full md:w-1/2 flex justify-center p-8 ${
              index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            <Image
              src={interest.imageUrl}
              alt={interest.title}
              width={1000}
              height={800}
              className="w-full max-w-2xl h-auto object-cover rounded-xl"
            />
          </div>
          <div
            className={`md:w-1/2 flex flex-col ${index % 2 !== 0 ? 'md:items-end md:text-right' : ''}`}
          >
            <h4
              className="text-4xl md:text-5xl font-semibold mb-6"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {interest.title}
            </h4>
            <p
              className="text-xl md:text-2xl leading-relaxed"
              style={{ fontFamily: '"Shippori Mincho", serif' }}
            >
              {interest.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderGridCards = (items: typeof interests.spaceAndCreation) => (
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
          <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
            <Image
              src={interest.imageUrl}
              alt={interest.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
            />
          </div>
          <h4
            className="text-2xl font-semibold mb-2"
            style={{ fontFamily: '"Shippori Mincho", serif' }}
          >
            {interest.title}
          </h4>
          <p
            className="text-base opacity-80 leading-relaxed"
            style={{ fontFamily: '"Shippori Mincho", serif' }}
          >
            {interest.description}
          </p>
        </motion.div>
      ))}
    </div>
  );

  const renderScatteredCards = (items: typeof interests.spaceAndCreation) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 justify-items-center">
      {items.map((interest, index) => {
        const offsets = ['md:mt-0', 'md:mt-16', 'md:-mt-8', 'md:mt-24', 'md:-mt-4'];
        return (
          <motion.div
            key={interest.title}
            className={`w-64 md:w-56 group cursor-pointer ${offsets[index] ?? ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-full shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
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
        );
      })}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden transition-colors duration-700 ease-out ${current.className}`}
      style={current.style}
    >
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M500 0 C200 400 800 800 500 1200 S800 1600 500 2000"
          fill="none"
          stroke="#008877"
          strokeWidth="24"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </motion.svg>

      {/* Space & Creation */}
      <section
        ref={spaceRef}
        className="relative z-10 max-w-6xl mx-auto py-32 px-8 md:px-24 text-black"
      >
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          Space & Creation
        </motion.h3>
        {renderAlternatingCards(interests.spaceAndCreation)}
      </section>

      {/* Culture & Exploration */}
      <section ref={cultureRef} className="relative z-10 py-32 px-8 text-black">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          Culture & Exploration
        </motion.h3>
        {renderGridCards(interests.cultureAndExploration)}
      </section>

      {/* Digital */}
      <section ref={digitalRef} className="relative z-10 py-32 px-8 text-[#008877]">
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-bold mb-16 text-center"
          style={{ fontFamily: '"Shippori Mincho", serif' }}
        >
          Digital
        </motion.h3>
        {renderGridCards(interests.digital)}
      </section>
    </div>
  );
}

