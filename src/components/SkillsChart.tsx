"use client";
import React, { useMemo, useState, useEffect } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { SCORE, StageSkillData } from "@/data/skills";

const COLORS = {
  strong: "#bb5555",
  assisted: "#008877",
  radarCurrent: "#bb5555",
  radarGrowth: "#008877",
};

export default function SkillsChart({ stageData }: { stageData: StageSkillData }) {
  const catOrder = useMemo(() => stageData.categories.map((c) => c.label), [stageData]);
  const [selectedCats, setSelectedCats] = useState<string[]>(catOrder);

  useEffect(() => {
    setSelectedCats(catOrder);
  }, [catOrder]);

  const radarData = useMemo(
    () => stageData.categories.filter((c) => selectedCats.includes(c.label)),
    [stageData, selectedCats]
  );

  const tools = useMemo(() => {
    return stageData.tools
      .filter((t) => selectedCats.includes(t.cat))
      .sort((a, b) => {
        const byCat = catOrder.indexOf(a.cat) - catOrder.indexOf(b.cat);
        if (byCat !== 0) return byCat;
        if (b.level !== a.level) return b.level - a.level;
        return a.label.localeCompare(b.label, "ja");
      });
  }, [stageData, selectedCats, catOrder]);

  return (
    <div className="min-h-screen w-full bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2">
            {catOrder.map((label) => (
              <button
                key={label}
                onClick={() =>
                  setSelectedCats((prev) =>
                    prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
                  )
                }
                className={`px-3 py-1 rounded-md text-xs border transition ${
                  selectedCats.includes(label)
                    ? "bg-[#bb5555] text-white border-[#bb5555]"
                    : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* レーダーチャート */}
        <section className="bg-white rounded-2xl shadow p-6 w-full lg:w-1/2">
          <div className="w-full h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={120}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                  <PolarRadiusAxis domain={[0, 5]} tickCount={6} />
                <Radar
                  name="現在"
                  dataKey="current"
                  stroke={COLORS.radarCurrent}
                  fill={COLORS.radarCurrent}
                  fillOpacity={0.35}
                />
                <Radar
                  name="伸びしろ"
                  dataKey="growth"
                  stroke={COLORS.radarGrowth}
                  fill={COLORS.radarGrowth}
                  fillOpacity={0.25}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* 横型バー */}
        <section className="bg-white rounded-2xl shadow p-6 w-full lg:w-1/2">
          <div className="w-full h-[640px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tools} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 150 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} />
                <YAxis type="category" dataKey="label" width={150} />
                <Tooltip formatter={(value: number) => `${value} / 5`} labelFormatter={(label: string) => `${label}`} />
                <Bar dataKey="level" radius={[4, 4, 4, 4]}>
                    {tools.map((entry) => (
                      <Cell
                        key={entry.label}
                        fill={entry.level === SCORE.STRONG ? COLORS.strong : COLORS.assisted}
                      />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-[#bb5555]"></span>使える（5）
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded bg-[#008877]"></span>AIと一緒/学習中（2）
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

