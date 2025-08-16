'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

const getCultureLink = (title: string) =>
  title === 'Photography' ? '/photos' : `/special/${slugify(title)}`;

const getDigitalLink = (title: string) => `/works?tag=${slugify(title)}`;

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
      description: '墨と筆で描く、静寂と躍動。',
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
      title: 'Data Analysis',
      description: '論理と創造で、情報の関係性を可視化する。',
      imageUrl: '/images/figure_master.webp',
    },
    {
      title: 'Design × Programming',
      description: '美しさと使いやすさを追求し、情報を最適に届ける。',
      imageUrl: '/images/web_pavillion.PNG',
    },
    {
      title: 'Artificial Intelligence',
      description: '正直、作業はこいつ任せだぜ、相棒。',
      imageUrl: '/images/ai_girl_1.png',
    },
  ],
};

type ThemeKey = 'spaceAndCreation' | 'cultureAndExploration' | 'digital';

const themes: Record<ThemeKey, { className: string; style?: React.CSSProperties }> = {
  spaceAndCreation: {
    className: 'bg-white text-gray-900',
  },
  cultureAndExploration: {
    className: 'bg-white text-[#bb5555]',
  },
  digital: {
    className: 'text-[#008877]',
  },
};

// Code snippets pool
const allCodeSnippets = [
  [
    "import { NextPage } from 'next';",
    "import { motion } from 'framer-motion';",
    "",
    "const Welcome: NextPage = () => (",
    "  <motion.h1>Hello, World!</motion.h1>",
    ");",
  ],
  [
    "interface User {",
    "  id: number;",
    "  name: string;",
    "  email?: string;",
    "}",
  ],
  [
    "const theme = {",
    "  colors: {",
    "    primary: '#008877',",
    "    secondary: '#bb5555',",
    "  }",
    "};",
  ],
  [
    "async function fetchData(url: string) {",
    "  const response = await fetch(url);",
    "  const data = await response.json();",
    "  return data;",
    "}",
  ],
  [
    "export const getServerSideProps = async () => {",
    "  // Fetch data from external API",
    "  const res = await fetch(`https://...`);",
    "  const data = await res.json();",
    "  return { props: { data } };",
    "}",
  ],
  [
    ".card {",
    "  background: #fff;",
    "  border-radius: 8px;",
    "  box-shadow: 0 4px 6px rgba(0,0,0,0.1);",
    "}",
  ]
];

interface TypingCodeBackgroundProps {
  snippets: string[];
  position: React.CSSProperties;
}

const TypingCodeBackground: React.FC<TypingCodeBackgroundProps> = ({ snippets, position }) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        setDisplayed([]);
        setIsAnimating(true);
      }, 7000 + Math.random() * 3000); // 7-10秒のランダムな待機時間
      return () => clearTimeout(timer);
    }

    let lineIndex = 0;
    let charIndex = 0;

    const timer = setInterval(() => {
      if (lineIndex >= snippets.length) {
        clearInterval(timer);
        setIsAnimating(false);
        return;
      }

      const currentLine = snippets[lineIndex];
      setDisplayed((prev) => {
        const next = [...prev];
        if (next.length <= lineIndex) {
          next.push('');
        }
        next[lineIndex] = currentLine.slice(0, charIndex);
        return next;
      });

      charIndex++;

      if (charIndex > currentLine.length) {
        charIndex = 0;
        lineIndex++;
      }
    }, 60); // タイピング速度

    return () => clearInterval(timer);
  }, [isAnimating, snippets]);

  return (
    <div className="absolute overflow-hidden pointer-events-none z-20 opacity-100 flex flex-col p-2 rounded-lg" style={position}>
      {snippets.map((_, i) => (
        <pre key={i} className="text-white font-mono text-sm md:text-base whitespace-pre-wrap">
          {displayed[i] || ''}
        </pre>
      ))}
    </div>
  );
};

export default function InterestsSection() {
  const [theme, setTheme] = useState<ThemeKey>('spaceAndCreation');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [animatedSnippets, setAnimatedSnippets] = useState<{ snippets: string[]; position: React.CSSProperties }[]>([]);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spaceRef = useRef(null);
  const cultureRef = useRef(null);
  const digitalRef = useRef(null);

  const spaceInView = useInView(spaceRef, { amount: 0.6 });
  const cultureInView = useInView(cultureRef, { amount: 0.6 });
  const digitalInView = useInView(digitalRef, { amount: 0.6 });

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const { scrollYProgress: scrollYProgressCulture } = useScroll({ target: cultureRef, offset: ["start end", "end start"] });
  const backgroundYCulture = useTransform(scrollYProgressCulture, [0, 1], ["-100%", "100%"]);

  useEffect(() => {
    const generateSnippets = () => {
      const newSnippets = [
        {
          snippets: allCodeSnippets[0],
          position: { top: '20%', left: '80%', transform: 'translate(-50%, -50%) scale(1)', width: '700px' },
        },
        {
          snippets: allCodeSnippets[1],
          position: { top: '0%', left: '55%', transform: 'translate(-50%, -50%) scale(1)', width: '700px' },
        },
        {
          snippets: allCodeSnippets[2],
          position: { top: '75%', left: '100%', transform: 'translate(-50%, -50%) scale(1)', width: '600px' },
        },
        {
          snippets: allCodeSnippets[3],
          position: { top: '55%', left: '45%', transform: 'translate(-50%, -50%) scale(1)', width: '700px' },
        },
        {
          snippets: allCodeSnippets[4],
          position: { top: '110%', left: '80%', transform: 'translate(-50%, -50%) scale(1)', width: '500px' },
        },
        {
          snippets: allCodeSnippets[5],
          position: { top: '125%', left: '40%', transform: 'translate(-50%, -50%) scale(1)', width: '700px' },
        },
      ];
      setAnimatedSnippets(newSnippets);
    };
    generateSnippets();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (spaceInView) setTheme('spaceAndCreation');
    else if (cultureInView) setTheme('cultureAndExploration');
    else if (digitalInView) {
      setTheme('digital');
    }
  }, [spaceInView, cultureInView, digitalInView]);

  const current = themes[theme];

  const renderAlternatingCards = (items: typeof interests.spaceAndCreation) => (
    <div className="flex flex-col gap-24">
      {items.map((interest, index) => (
        <motion.div
          key={interest.title}
          className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full md:w-1/2 h-64 overflow-hidden">
            <Image
              src={interest.imageUrl}
              alt={interest.title}
              fill
              className="object-cover"
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,50vw"
            />
          </div>
          <div className="md:w-1/2">
            <h4 className="text-2xl font-semibold mb-4">
              {interest.title}
            </h4>
            <p className="opacity-80 leading-relaxed">
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
          <div className="relative h-64 mb-4 overflow-hidden">
            <Image
              src={interest.imageUrl}
              alt={interest.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
            />
          </div>
          <h4 className="text-lg font-semibold mb-2">
            {interest.title}
          </h4>
          <p className="text-sm opacity-80 leading-relaxed">
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
        const yAnimation = index % 2 === 0 ? [0, 20, 0] : [0, -20, 0]; // Odd index (0, 2, ...) moves down, Even index (1, 3, ...) moves up
        return (
          <motion.div
            key={interest.title}
            className={`w-64 md:w-56 group cursor-pointer ${offsets[index] ?? ''}`}
            initial={{ opacity: 0 }} // Initial opacity for fade-in
            whileInView={{ opacity: 1 }} // Fade in when in view
            animate={{ y: yAnimation }} // Apply the repeating animation
            viewport={{ once: true }} // Only animate once when entering viewport
            transition={{
              duration: 2, // Duration of one cycle
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: index * 0.1 // Stagger animation
            }}
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
            <h4 className="text-lg font-semibold mb-2">
              {interest.title}
            </h4>
            <p className="text-sm opacity-80 leading-relaxed">
              {interest.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );

  const renderDigitalGrid = (items: typeof interests.digital) => {
    // いい感じに散らばしたレイアウト
    // メインカードを大きめに配置し、余白を埋めるように様々なサイズ・位置のプレースホルダーを追加
    const layout: { key: string; className: string; interest?: typeof items[number] }[] = [
      // メインカード（大きめ・斜め配置）
      { key: 'item-0', className: 'col-start-2 col-span-4 row-start-2 row-span-5', interest: items[0] },
      { key: 'item-1', className: 'col-start-7 col-span-5 row-start-6 row-span-4', interest: items[1] },
      { key: 'item-2', className: 'col-start-4 col-span-5 row-start-12 row-span-4', interest: items[2] },

      // プレースホルダー（サイズ・位置をバラバラにして余白を埋める）
      { key: 'ph1', className: 'relative overflow-hidden col-start-1 col-span-1 row-start-1 row-span-2' },
      { key: 'ph2', className: 'relative overflow-hidden col-start-6 col-span-3 row-start-4 row-span-2' },
      { key: 'ph3', className: 'relative overflow-hidden col-start-12 col-span-1 row-start-3 row-span-1' },
      { key: 'ph4', className: 'relative overflow-hidden col-start-11 col-span-2 row-start-13 row-span-3' },
      { key: 'ph5', className: 'relative overflow-hidden col-start-1 col-span-3 row-start-14 row-span-2' },
      { key: 'ph6', className: 'relative overflow-hidden col-start-1 col-span-3 row-start-9 row-span-3' },
      { key: 'ph7', className: 'relative overflow-hidden col-start-9 col-span-2 row-start-12 row-span-5' },
      { key: 'ph8', className: 'relative overflow-hidden col-start-12 col-span-1 row-start-8 row-span-2' },
      { key: 'ph9', className: 'relative overflow-hidden col-start-5 col-span-2 row-start-10 row-span-2' },
      { key: 'ph10', className: 'relative overflow-hidden col-start-10 col-span-3 row-start-4 row-span-2' },
      { key: 'ph11', className: 'relative overflow-hidden col-start-2 col-span-2 row-start-1 row-span-1' },
      { key: 'ph12', className: 'relative overflow-hidden col-start-4 col-span-1 row-start-9 row-span-2' },
      { key: 'ph13', className: 'relative overflow-hidden col-start-1 col-span-1 row-start-5 row-span-4' },
      { key: 'ph14', className: 'relative overflow-hidden col-start-6 col-span-2 row-start-1 row-span-2' },
      { key: 'ph15', className: 'relative overflow-hidden col-start-8 col-span-1 row-start-1 row-span-2' },
      { key: 'ph16', className: 'relative overflow-hidden col-start-11 col-span-2 row-start-11 row-span-2' },
      { key: 'ph17', className: 'relative overflow-hidden col-start-9 col-span-2 row-start-2 row-span-2' },
      { key: 'ph18', className: 'relative overflow-hidden col-start-2 col-span-2 row-start-12 row-span-2' },
      { key: 'ph19', className: 'relative overflow-hidden col-start-6 col-span-1 row-start-7 row-span-2' },
      { key: 'ph20', className: 'relative overflow-hidden col-start-11 col-span-2 row-start-1 row-span-2' },
    ];
    return (
      <div className="relative w-full">
        {animatedSnippets.map((config, index) => (
          <TypingCodeBackground key={index} snippets={config.snippets} position={config.position} />
        ))}
        <div className="relative z-10 grid grid-cols-[repeat(12,1fr)] grid-rows-[repeat(15,1fr)] w-full max-w-6xl mx-auto h-[80vh] md:h-[90vh] gap-4">
          {layout.map((block) =>
            block.interest ? (
              <Link
                href={getDigitalLink(block.interest.title)}
                key={block.key}
                className={`group cursor-pointer ${block.className}`}
                onMouseEnter={() => setHoveredImage(block.interest!.imageUrl)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative w-full h-full min-h-0 overflow-hidden rounded-lg shadow-lg bg-gray-800/20">
                    <Image
                      src={block.interest.imageUrl}
                      alt={block.interest.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
                    />
                  </div>
                  <h4
                    className="text-xl font-semibold mt-4 mb-2 text-white"
                    style={{}}
                  >
                    {block.interest.title}
                  </h4>
                  <p
                    className="text-base opacity-80 leading-relaxed"
                    style={{}}
                  >
                    {block.interest.description}
                  </p>
                </motion.div>
              </Link>
            ) : (
              <div key={block.key} className={`${block.className} bg-white/5 rounded-md`}>
                {hoveredImage && (
                  <Image
                    src={hoveredImage}
                    alt="preview"
                    fill
                    className="object-cover opacity-20 rounded-md"
                    sizes="16vw"
                  />
                )}
              </div>
            )
          )}
        </div>
      </div>
    );
  };

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
          d="M800 0 C100 400 400 800 1000 1200 S800 200 500 2000 100 100"
          fill="none"
          stroke="#008877"
          strokeWidth="56"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <motion.path
          d="M1000 0 C0 400 1000 800 1000 800 1000 800 1000 800 0 1200 S800 200 500 2000"
          fill="none"
          stroke="#bb5555"
          strokeWidth="56"
          strokeLinecap="round"
          style={{ pathLength }}
        />
      </motion.svg>

      {/* Space & Creation */}
      <section
        ref={spaceRef}
        className="relative z-10 py-48 px-8 text-black"
      >
        <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 mb-32 items-center max-w-6xl mx-auto w-full">
          <motion.h3
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1 text-5xl md:text-7xl font-bold"
            style={{}}
          >
            Space & Creation
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 text-base opacity-80 leading-relaxed"
            style={{}}
          >
            建築、不動産、そして日々の暮らしの中での創造的な試み。機能と美が融合した心地よい空間、その価値を捉え、未来の可能性を創造すること。手を動かし、思考を形にすることの喜びを探求します。
          </motion.p>
        </div>
        <div className="max-w-6xl mx-auto">
          {renderAlternatingCards(interests.spaceAndCreation)}
        </div>
      </section>
      {/* Culture and Exploration */}
      <motion.section
        ref={cultureRef}
        className="relative flex flex-col justify-center px-8 py-48 bg-white text-[#bb5555]"
        style={{
          backgroundImage: 'url("/images/asanoha.svg")',
          backgroundSize: '140px 80px',
          backgroundRepeat: 'repeat',
          backgroundPositionY: backgroundYCulture,
        }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
        <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 mb-32 items-center max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-1 text-5xl md:text-7xl font-bold"
            style={{}}
          >
            Arts & Culture
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2 text-base opacity-80 leading-relaxed"
            style={{}}
          >
            光と影で切り取る写真、土地の味を噛みしめる食文化、そして未知の風景を求める旅。伝統的な盆栽や書道から、自己を発見する冒険まで。世界の多様な文化に触れ、その本質を探求します。
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-32 max-w-6xl mx-auto">
          {interests.cultureAndExploration.map((interest, index) => (
            <Link
              href={getCultureLink(interest.title)}
              key={interest.title}
              className="group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-80 mb-6 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={interest.imageUrl}
                    alt={interest.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width:768px)100vw,(max-width:1024px)50vw,33vw"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  {interest.title}
                </h4>
                <p className="text-base opacity-80 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>
      {/* Digital */}
      <section ref={digitalRef} className="relative w-full flex flex-col items-center overflow-hidden text-[#008877] pt-48 px-8 min-h-[200vh]"
        style={{ backgroundColor: '#0a0a0a', backgroundImage: 'radial-gradient(#00887780 1px, #0a0a0a 1px)', backgroundSize: '40px 40px' }}>
        <div className="grid md:grid-cols-3 gap-x-12 gap-y-8 mb-32 items-center max-w-6xl w-full">
            <motion.h3
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:col-span-1 text-5xl md:text-7xl font-bold text-[#008877]"
              style={{}}
            >
              Digital & Technology
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-2 text-base text-gray-300 opacity-80 leading-relaxed"
                style={{}}
            >
                論理と創造性でデジタル世界を構築するプログラミング。美しさと使いやすさを追求するWebデザイン。そして、数字の裏に隠された意味を読み解き、未来を予測するデータ分析。コードの一行一行が、新しい価値を生み出すキャンバスです。
            </motion.p>
        </div>
        <div className="flex-1 max-w-6xl w-full">
          {renderDigitalGrid(interests.digital)}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-white to-transparent z-20" />
      </section>
    </div>
  );
}



