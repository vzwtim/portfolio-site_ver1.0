// /src/components/SkillsChart.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend,
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell,
} from "recharts";
import type { StageSkillData } from "@/data/skills";
import {
  RADAR_ORDER, RADAR_LABEL_SHORT, COLORS, toolsMeta, skillsByStage
} from "@/data/skills";

// ツールチップ（自由記述note）
function SkillTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload as {
    label: string; level: number; future?: number; note?: string;
  };
  return (
    <div className="rounded-md border bg-white/95 px-3 py-2 text-sm shadow">
      <div className="font-medium">{label}</div>
      <div className="text-neutral-600">
        現在: {item.level} / 5{typeof item.future === "number" ? `　未来: ${item.future} / 5` : ""}
      </div>
      <div className={`mt-1 ${item.note ? "text-neutral-800" : "text-neutral-400"}`}>
        {item.note || "（メモなし）"}
      </div>
    </div>
  );
}

// 固定凡例（常時表示）
function StaticBarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm mb-1">
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded" style={{ background: COLORS.radarCurrent }} />
        現在（0〜5）
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="inline-block w-3 h-3 rounded" style={{ background: COLORS.radarGrowth, opacity: 0.35 }} />
        未来（目標・薄）
      </span>
      <span className="text-neutral-500">0: 未習得 / 3: 実務基礎 / 5: 即戦力</span>
    </div>
  );
}

export default function SkillsChart({ stageData }: { stageData: StageSkillData }) {
  // カテゴリフィルタ（初期は全選択）
  const [selectedCats, setSelectedCats] = useState<string[]>([...RADAR_ORDER]);

  // レーダー用：未来（目標）カテゴリ値
  const futureMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of skillsByStage.future.categories) m.set(c.label, c.current);
    return m;
  }, []);

  // 棒グラフ用：未来（目標）スキル別レベル
  const futureLevelMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const t of skillsByStage.future.tools) m.set(t.label, t.level ?? 0);
    return m;
  }, []);

  // レーダー：選択ステージ（現在）＋ 未来（目標）
  const radarData = useMemo(() => {
    const nowMap = new Map(stageData.categories.map((c) => [c.label, c.current]));
    return RADAR_ORDER
      .filter((lbl) => selectedCats.includes(lbl))
      .map((lbl) => ({
        label: lbl,
        current: nowMap.get(lbl) ?? 0,
        growth: futureMap.get(lbl) ?? 0,
      }));
  }, [stageData, futureMap, selectedCats]);

  // 棒グラフ：固定順（カテゴリ順→カテゴリ内は toolsMeta 定義順）・0も表示
  const tools = useMemo(() => {
    // 現在ステージの値
    const levelMap = new Map(stageData.tools.map((t) => [t.label, t.level]));
    // toolsMeta は一部に note が無い要素があるので note?: string に収束
    type ToolMeta = { label: string; cat: string; note?: string };
    const metaList = toolsMeta as unknown as ToolMeta[];

    const byCat = new Map<string, { label: string; level: number; future: number; note?: string; cat: string }[]>();
    for (const cat of RADAR_ORDER) byCat.set(cat, []);

    for (const meta of metaList) {
      const level  = levelMap.get(meta.label) ?? 0;                // 現在
      const future = futureLevelMap.get(meta.label) ?? 0;          // 未来（目標）
      const bucket = byCat.get(meta.cat)!;
      bucket.push({ label: meta.label, level, future, note: meta.note, cat: meta.cat });
    }

    const flat: { label: string; level: number; future: number; note?: string; cat: string }[] = [];
    for (const cat of RADAR_ORDER) {
      if (!selectedCats.includes(cat)) continue; // フィルタ適用
      const list = byCat.get(cat);
      if (list?.length) flat.push(...list);
    }
    return flat;
  }, [stageData, selectedCats, futureLevelMap]);

  // 全選択・全解除
  const allSelected = selectedCats.length === RADAR_ORDER.length;
  const noneSelected = selectedCats.length === 0;
  const toggleCat = (label: string) =>
    setSelectedCats((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  return (
    <div className="w-full bg-white py-4 px-0">
      <div className="max-w-7xl mx-auto">
        {/* フィルタチップ（カテゴリ切替） */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setSelectedCats(allSelected ? [] : [...RADAR_ORDER])}
            className={`px-3 py-1 rounded-md text-xs border transition ${
              allSelected
                ? "bg-neutral-800 text-white border-neutral-800"
                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
            }`}
            aria-pressed={allSelected}
            title={allSelected ? "全解除" : "全選択"}
          >
            {allSelected ? "全解除" : "全選択"}
          </button>
          {RADAR_ORDER.map((label) => (
            <button
              key={label}
              onClick={() => toggleCat(label)}
              className={`px-3 py-1 rounded-md text-xs border transition ${
                selectedCats.includes(label)
                  ? "bg-[#bb5555] text-white border-[#bb5555]"
                  : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
              }`}
              aria-pressed={selectedCats.includes(label)}
            >
              {RADAR_LABEL_SHORT[label] ?? label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* レーダー（サイズ拡大・余白圧縮） */}
          <section className="bg-white rounded-xl border border-neutral-200 p-3 w-full lg:w-1/2">
            <div className="w-full h-[560px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="82%">
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="label"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(v: string) => RADAR_LABEL_SHORT[v] ?? v}
                  />
                  <PolarRadiusAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 11 }} />
                  {/* 背面：未来（目標） */}
                  <Radar
                    name="未来（目標）"
                    dataKey="growth"
                    stroke={COLORS.radarGrowth}
                    fill={COLORS.radarGrowth}
                    fillOpacity={0.25}
                  />
                  {/* 前面：現在 */}
                  <Radar
                    name="現在"
                    dataKey="current"
                    stroke={COLORS.radarCurrent}
                    fill={COLORS.radarCurrent}
                    fillOpacity={0.35}
                  />
                  <Legend wrapperStyle={{ paddingTop: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 棒グラフ（未来を薄く後ろ、現在を前面で重ね） */}
          <section className="bg-white rounded-xl border border-neutral-200 p-3 w-full lg:w-1/2">
            <StaticBarLegend />
            <div className="w-full h-[1040px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={tools}
                  layout="vertical"
                  margin={{ top: 6, right: 20, bottom: 6, left: 0 }} // ← 左余白は戻す（負値だとY軸切れる）
                  barCategoryGap="20%"
                  barGap={-18} // 重なりを強める
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={230}
                    tick={{ fontSize: 13 }}
                    interval={0}     // 全ラベル表示（間引きなし）
                    tickLine={false}
                  />
                  <Tooltip content={<SkillTooltip />} />

                  {/* 未来（薄い影・背面） */}
                  <Bar dataKey="future" radius={[4, 4, 4, 4]} barSize={18}>
                    {tools.map((_, i) => (
                      <Cell key={`f-${i}`} fill={COLORS.radarGrowth} opacity={0.35} />
                    ))}
                  </Bar>

                  {/* 現在（前面） */}
                  <Bar dataKey="level" radius={[4, 4, 4, 4]} barSize={18} minPointSize={2}>
                    {tools.map((_, i) => (
                      <Cell key={`c-${i}`} fill={COLORS.radarCurrent} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {noneSelected && (
              <p className="mt-2 text-xs text-neutral-500">
                ※カテゴリが全て非表示です。上のボタンで選択してください。
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
