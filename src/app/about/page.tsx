"use client";

import Image from 'next/image';
import { useState } from 'react';
import SkillsChart from '@/components/SkillsChart';
import { careerStages, skillsByStage, CareerStageKey } from '@/data/skills';

export default function About() {
  const [stage, setStage] = useState<CareerStageKey>(careerStages[0].key);

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
              都市のダイナミクスを見つめながら、和室・ちゃぶ台・ミニマルな暮らしを軸に、日々の発見や街歩きの記録を積み重ねています。一級建築士の取得を目指しつつ、将来的には街と暮らしをつなぐ事業に挑戦予定です。趣味は、盆栽や書道などの日本文化、写真撮影、そして旅行。特に、自然や歴史的な場所を訪れることが好きです。
            </p>
          </div>
        </section>

        {/* Career & Education Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-8 text-center">
            経歴・学歴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2">学歴</h3>
              <ul className="list-disc list-inside text-base leading-loose">
                <li>仙台第二高等学校 卒業</li>
                <li>東京大学工学部建築学科 卒業</li>
                <li>東京大学大学院 新領域創成科学研究科 社会文化環境学 修了</li>
              </ul>
            </div>
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2">職歴</h3>
              <ul className="list-disc list-inside text-base leading-loose">
                <li>〇〇株式会社 アセット戦略部 (2024年 - 2025年)</li>
                <li>〇〇株式会社 建築設計部 (20XX年 - 20YY年)</li>
                <li>△△スタートアップ ソフトウェアエンジニア (20YY年 - 現在)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <div className="flex justify-center gap-2 mb-6">
            {careerStages.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setStage(key)}
                className={`px-3 py-1 rounded-md text-sm border transition ${
                  stage === key
                    ? 'bg-[#bb5555] text-white border-[#bb5555]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <SkillsChart stageData={skillsByStage[stage]} />
        </section>
      </div>
    </main>
  );
}

