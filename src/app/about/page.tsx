"use client";

import Image from 'next/image';
import { useState } from 'react';
import SkillsChart from '@/components/SkillsChart';
// careerStages / CareerStageKey はもう使わないので import しない
import { skillsByStage } from '@/data/skills';

type SkillsStageKey = keyof typeof skillsByStage; // "current" | "future" など
type TimelineStage = { label: string; education: string[]; work: string[]; key: SkillsStageKey };

// Career stages with corresponding education and work entries
const timelineStages: TimelineStage[] = [
  { label: '高校',   education: ['仙台第二高等学校 卒業'], work: [], key: 'future' },
  { label: '大学',   education: ['東京大学工学部建築学科 卒業'], work: [], key: 'future' },
  { label: '大学院', education: ['東京大学大学院 新領域創成科学研究科 社会文化環境学 修了'], work: [], key: 'future' },
  {
    label: '社会人',
    education: [],
    work: [
      '〇〇株式会社 アセット戦略部 (2024年 - 2025年)',
      '〇〇株式会社 建築設計部 (20XX年 - 20YY年)',
      '△△スタートアップ ソフトウェアエンジニア (20YY年 - 現在)',
    ],
    key: 'current',
  },
];

export default function About() {
  // indexで管理（スライダーと相性が良い）
  const [stage, setStage] = useState<number>(0);
  const current = timelineStages[stage];

  return (
    <main className="bg-[#ffffff] text-[#232024] pt-24 md:pt-28 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Profile Section */}
        <section className="flex flex-col items-center mb-24">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md relative mx-auto">
            <Image
              src="/images/babayudai_logo.svg"
              alt="YUDAI Logo"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-lg leading-relaxed mb-4">
              大学で建築・都市・社会・環境を学び、現在は不動産デベロッパーとして、用地取得・開発・アセットマネジメント業務に従事。経営企画・DXプロジェクトにも参画し、ビルやマンション単位の取得開発に携わっています。
            </p>
            <p className="text-lg leading-relaxed">
              都市のダイナミクスを見つめながら、和室・ちゃぶ台・ミニマルな暮らしを軸に、日々の発見や街歩きの記録を積み重ねています。一級建築士の取得を目指しつつ、将来的には街と暮らしをつなぐ事業に挑戦予定です。趣味は、盆栽や書道などの日本文化、写真撮影、そして旅行。特に、自然や歴史的な場所を訪れることが好きです。
            </p>
          </div>
        </section>

        {/* Career & Education Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-8 text-center">経歴・学歴</h2>
          <div className="mb-6 text-center">
            <input
              type="range"
              min={0}
                max={timelineStages.length - 1} 
              value={stage}
              onChange={(e) => setStage(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="mt-2">{timelineStages[stage].label}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2">学歴</h3>
              <ul className="list-disc list-inside text-base leading-loose">
                {current.education.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2">職歴</h3>
              <ul className="list-disc list-inside text-base leading-loose">
                {current.work.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          {/* タブ（timelineStages と同じ順でラベルを並べる） */}
          <div className="flex justify-center gap-2 mb-6">
            {timelineStages.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => setStage(idx)}
                className={`px-3 py-1 rounded-md text-sm border transition ${
                  stage === idx
                    ? 'bg-[#bb5555] text-white border-[#bb5555]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
                aria-pressed={stage === idx}
              >
                {s.label}
              </button>
            ))}
          </div>
        
          {/* スキルチャート：stage は number 想定 */}
          <SkillsChart stageData={skillsByStage[timelineStages[stage].key]} />
        </section>
      </div>
    </main>
  );
}

