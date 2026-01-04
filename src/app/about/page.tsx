// /src/app/about/page.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import SkillsChart from "@/components/SkillsChart";
import { skillsByStage, type StageKey } from "@/data/skills";

const journeyData = [
  { year: "199X – 2018", event_jp: "仙台で育つ", event_en: "Birthplace", details_jp: "宮城県仙台市で育つ。団地や住宅地、自然が混在する環境で過ごす。", details_en: "Raised in Sendai, Japan, in an area where housing complexes, residential neighborhoods, and nature coexist.", image: "/images/film_color_10.jpg" },
  { year: "2015 – 2018", event_jp: "仙台第二高等学校", event_en: "High School", details_jp: "高等学校ではテニス部に所属。継続することと、組織の中で役割を担う感覚を学ぶ。", details_en: "Played tennis in high school, learning persistence and how to function within a team and organization.", image: "/images/film_color_11.jpg" },
  { year: "2018 – 2022", event_jp: "東京大学 工学部 建築学科", event_en: "University", details_jp: "不良住宅や住環境に関心を持ち、建築で社会にインパクトを与えるアイデアを思考し続ける。", details_en: "Studied architecture at the University of Tokyo. Developed an interest in substandard housing and living environments, often exploring ideas aimed at creating social impact through architecture.", image: "/images/figure_bachelor_1.png" },
  { year: "2022 – 2024", event_jp: "東京大学大学院 新領域創成科学研究科", event_en: "Graduate School", details_jp: "社会・環境・人類学などへ関心を広げ、「まちはつくるものか、できてくるものか」を問い続ける。", details_en: "Completed a master’s program at the University of Tokyo. Expanded interests into society, environment, and anthropology, while questioning whether cities are designed or emergent.", image: "/images/figure_master_1.png" },
  { year: "2024 – Present", event_jp: "不動産デベロッパー", event_en: "Career", details_jp: "用地取得、マンション開発、アセットマネジメントに従事。\n一部出資案件にも関わり、不動産を投資の視点からも扱う。\nまた、経営企画・DXプロジェクトにも参画し、会社の仕組みや意思決定プロセスへの関心を深めている。", details_en: "Working as a real estate developer, engaged in land acquisition, residential development, and asset management. Also involved in investment projects, viewing real estate from a financial perspective.\nIn parallel, participating in corporate planning and DX initiatives, developing an interest in organizational structures and decision-making processes.", image: "/images/building_osaka.jpg" },
  { year: "Future", event_jp: "Independent Development", event_en: "Independent Development", details_jp: "小さな規模でも、構想から実装までを担う一人デベロッパーとしての可能性。", details_en: "Exploring the possibility of independent real estate development, handling projects from concept to execution on a small scale.", isFuture: true },
  { year: "Future", event_jp: "Strategy & Consulting", event_en: "Strategy & Consulting", details_jp: "不動産や建築を、個別案件ではなく「仕組み」として捉え、経営企画・事業設計の立場から関わる道。", details_en: "Contributing through corporate strategy and business design, viewing real estate and architecture as systems rather than isolated projects.", isFuture: true },
  { year: "Future", event_jp: "Hospitality / Hotel Development", event_en: "Hospitality / Hotel Development", details_jp: "現在関わっているホテル開発を起点に、より深く滞在体験やホスピタリティに向き合う可能性。", details_en: "Deepening involvement in hospitality and hotel development, building on current experience in this field.", isFuture: true },
  { year: "Future", event_jp: "Investment & Finance", event_en: "Investment & Finance", details_jp: "不動産出資や個人投資を通じて関心を深めている金融分野。「つくる側」とは異なる視点から不動産に関与する選択肢。", details_en: "Exploring real estate and finance from the investment side, engaging with the built environment from a perspective different from development.", isFuture: true },
];

const STAGES: { key: StageKey; label: string }[] = [
  { key: "highschool", label: "高校" },
  { key: "university", label: "大学" },
  { key: "graduate",   label: "大学院" },
  { key: "current",    label: "現在" },
  { key: "future",     label: "未来" },
];

const TimelineItem = ({ item, isLast }: { item: typeof journeyData[0], isLast: boolean }) => (
  <motion.div
    className="relative pl-12 pb-12"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    {!isLast && <div className="absolute left-[18px] top-5 h-full w-0.5 bg-gray-200"></div>}
    <div className={`absolute left-3 top-1 h-5 w-5 rounded-full border-4 border-white ${item.isFuture ? 'bg-[#bb5555]' : 'bg-[#008877]'}`}></div>
    <div className={`md:grid items-start ${item.image ? 'md:grid-cols-3 md:gap-8' : 'md:grid-cols-1'}`}>
        <div className={item.image ? 'md:col-span-2 mb-4 md:mb-0' : ''}>
            <p className="text-sm text-gray-500 mb-1">{item.year}</p>
            <h3 className="text-xl font-bold text-gray-900">{item.event_jp}</h3>
            <p className="text-gray-500 text-base">{item.event_en}</p>
            <div className="mt-3">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{item.details_jp}</p>
              <p className="text-gray-500 mt-2 whitespace-pre-line text-sm leading-relaxed">{item.details_en}</p>
            </div>
        </div>
        {item.image && (
            <motion.div
              className="w-full h-40 md:h-full relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Image src={item.image} alt={item.event_jp} fill style={{objectFit: 'cover'}} className="rounded-lg shadow-md" />
            </motion.div>
        )}
    </div>
  </motion.div>
);

export default function About() {
  const [stage, setStage] = useState<StageKey>("current");

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
        <Image
          src="/images/building_osaka.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
      </div>

      <main>
        {/* Opening Section */}
        <section
          className="relative h-screen flex flex-col items-center justify-center text-center text-white"
        >
          <div className="relative z-10 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-full max-w-xs md:max-w-sm relative mx-auto mb-8">
                <Image src="/images/babayudai_logo.svg" alt="YUDAI Logo" width={500} height={500} className="object-contain" quality={90} priority />
              </div>
              <div className="max-w-3xl mx-auto">
                <p className="text-base md:text-lg leading-relaxed text-gray-100 mb-4 whitespace-pre-line">
                  {`建築と社会のあいだで考え続けた末、いまは不動産デベロッパーとして、都市に関与しています。
                  東京を歩き、建築を考えながら、旧耐震の和室でちゃぶ台を前に暮らしています。
                  今のうちに一度は、こうした住まい方をしておきたかった。`}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-400 whitespace-pre-line">
                  {`After studying architecture and society, I am now involved in cities as a real estate developer.
                  Living in an old Japanese-style room in Tokyo, sitting at a low table while walking the city and thinking about architecture. It is simply a way of living I wanted to experience while I still could.`}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other sections on white background */}
        <div className="relative bg-white text-gray-800">
          <div className="max-w-5xl mx-auto pt-24 md:pt-32 px-4 md:px-8">
            
            <section className="mb-24 md:mb-32">
              <motion.h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
                Journey
              </motion.h2>
              <div className="relative">
                {journeyData.map((item, index) => (
                  <TimelineItem key={index} item={item} isLast={index === journeyData.length - 1} />
                ))}
              </div>
            </section>

            <section className="mb-24 md:mb-32">
              <motion.h2 className="font-display text-4xl md:text-5xl font-extrabold mb-12 text-center text-gray-900" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }}>
                Skills
              </motion.h2>
              <div className="flex justify-center flex-wrap gap-3 mb-8">
                {STAGES.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setStage(key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                      stage === key
                        ? "bg-[#bb5555] text-white border-[#bb5555] shadow-lg shadow-[#bb5555]/20"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                    aria-pressed={stage === key}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <motion.div
                className="bg-gray-50/70 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200/80"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <SkillsChart stageData={skillsByStage[stage]} />
              </motion.div>
            </section>

            <section className="text-center mb-24 md:mb-32">
              <div className="max-w-2xl mx-auto">
                <p className="text-base md:text-lg leading-relaxed text-gray-800 mb-2">
                  いずれか一つに決めるのではなく、考え続けながら関わり方を更新していきたい。
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-500">
                  Rather than committing to a single path, I aim to keep refining how I engage with cities over time.
                </p>
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
