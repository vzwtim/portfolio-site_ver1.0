"use client";

import Image from 'next/image';
import { useState } from 'react';
import SkillsChart from '@/components/SkillSet';

// Career stages with corresponding education and work entries
const careerStages: { label: string; education: string[]; work: string[] }[] = [
  {
    label: '高校',
    education: ['仙台第二高等学校 卒業'],
    work: [],
  },
  {
    label: '大学',
    education: ['東京大学工学部建築学科 卒業'],
    work: [],
  },
  {
    label: '大学院',
    education: ['東京大学大学院 新領域創成科学研究科 社会文化環境学 修了'],
    work: [],
  },
  {
    label: '社会人',
    education: [],
    work: [
      '〇〇株式会社 アセット戦略部 (2024年 - 2025年)',
      '〇〇株式会社 建築設計部 (20XX年 - 20YY年)',
      '△△スタートアップ ソフトウェアエンジニア (20YY年 - 現在)',
    ],
  },
];

export default function About() {
  const [stage, setStage] = useState(0);
  const current = careerStages[stage];

  return (
    <main className="bg-[#ffffff] text-[#232024] pt-24 md:pt-28 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-6xl mx-auto">


        {/* Profile Section */}
        <section className="flex flex-col items-center mb-24">
          <div className="w-full max-w-xs md:max-w-sm lg:max-w-md relative mx-auto">
            <Image
              src="/images/babayudai_logo.svg" // ロゴ画像のパス
              alt="YUDAI Logo"
              width={500} // Adjust as needed for SVG, or remove if fill is used
              height={500} // Adjust as needed for SVG, or remove if fill is used
              className="object-contain"
            />
          </div>
          <div className="text-center">
            
            <p className="text-lg leading-relaxed mb-4">
              大学で建築・都市・社会・環境を学び、現在は不動産デベロッパーとして、用地取得・開発・アセットマネジメント業務に従事。経営企画・DXプロジェクトにも参画し、ビルやマンション単位の取得開発に携わっています。
        </p>
            <p className="text-lg leading-relaxed">
              都市のダイナミクスを見つめながら、和室・ちゃぶ台・ミニマルな暮らしを軸に、日々の発見や街歩きの記録を積み重ねています。一級建築士の取得を目指しつつ、将来的には街と暮らしをつなぐ事業に挑戦予定です。
              趣味は、盆栽や書道などの日本文化、写真撮影、そして旅行。特に、自然や歴史的な場所を訪れることが好きです。
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
              max={careerStages.length - 1}
              value={stage}
              onChange={(e) => setStage(parseInt(e.target.value))}
              className="w-full"
            />
            <p className="mt-2">{careerStages[stage].label}</p>
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
        <SkillsChart />
    </div>
    </main>
  );
}