"use client";
import React, { useMemo, useState } from "react";
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

// =====================================
// 五目飯スキルチャート（Radar + Bar） - 拡張版
// ・カテゴリとツールを大幅拡張
// ・プリセット切替 / カテゴリチップON-OFF / 検索フィルタ
// =====================================

// === スコア定義 ===
// 5 = 使える（即戦力） / 2 = AIと一緒ならできる・学習中 / 1 = これから
const SCORE = { STRONG: 5, ASSISTED: 2, FUTURE: 1 } as const;

// === 基本カテゴリ ===
const baseCategories = [
  { key: "programming", label: "プログラミング", current: 4, growth: 5 },
  { key: "architecture", label: "建築・設計", current: 5, growth: 4 },
  { key: "design", label: "デザイン", current: 4, growth: 5 },
  { key: "gis", label: "GIS・可視化", current: 5, growth: 4 },
  { key: "office", label: "オフィス", current: 5, growth: 3 },
  { key: "data", label: "データ分析", current: 2, growth: 5 },
  { key: "realestate", label: "不動産", current: 5, growth: 4 },
  { key: "finance", label: "金融", current: 4, growth: 5 },
  { key: "dx", label: "DX/自動化", current: 3, growth: 5 },
];

// === 追加カテゴリ（網羅） ===
const extraCategories = [
  { key: "marketing", label: "マーケティング", current: 3, growth: 5 },
  { key: "pm", label: "プロジェクトマネジメント", current: 4, growth: 5 },
  { key: "legal", label: "法務・コンプライアンス", current: 2, growth: 4 },
  { key: "language", label: "語学", current: 3, growth: 4 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 4, growth: 5 },
  { key: "education", label: "教育・研修", current: 3, growth: 4 },
  { key: "research", label: "リサーチ・分析", current: 4, growth: 5 },
  { key: "innovation", label: "イノベーション/新規事業", current: 3, growth: 5 },
  { key: "sustainability", label: "サステナビリティ/ESG", current: 2, growth: 5 },
  { key: "customer", label: "顧客対応・CX", current: 4, growth: 5 },
  { key: "training", label: "トレーニング・コーチング", current: 3, growth: 4 },
];

const allCategories = [...baseCategories, ...extraCategories];

// === ツール（スキル要素） ===
const baseTools = [
  // プログラミング
  { label: "Python", cat: "プログラミング", level: SCORE.STRONG },
  { label: "JavaScript / TypeScript", cat: "プログラミング", level: SCORE.ASSISTED },
  { label: "Node.js", cat: "プログラミング", level: SCORE.ASSISTED },
  // 建築・設計
  { label: "AutoCAD", cat: "建築・設計", level: SCORE.STRONG },
  { label: "SketchUp", cat: "建築・設計", level: SCORE.STRONG },
  { label: "Rhino + Grasshopper", cat: "建築・設計", level: SCORE.STRONG },
  { label: "Twinmotion", cat: "建築・設計", level: SCORE.STRONG },
  { label: "Lumion", cat: "建築・設計", level: SCORE.ASSISTED },
  // デザイン
  { label: "Adobe Illustrator", cat: "デザイン", level: SCORE.STRONG },
  { label: "Adobe Photoshop", cat: "デザイン", level: SCORE.STRONG },
  { label: "Blender", cat: "デザイン", level: SCORE.ASSISTED },
  { label: "Inkscape", cat: "デザイン", level: SCORE.ASSISTED },
  { label: "DaVinci Resolve", cat: "デザイン", level: SCORE.ASSISTED },
  // GIS
  { label: "ArcGIS", cat: "GIS・可視化", level: SCORE.STRONG },
  { label: "QGIS", cat: "GIS・可視化", level: SCORE.STRONG },
  { label: "Kepler.gl", cat: "GIS・可視化", level: SCORE.STRONG },
  // オフィス
  { label: "Excel", cat: "オフィス", level: SCORE.STRONG },
  { label: "PowerPoint", cat: "オフィス", level: SCORE.STRONG },
  // データ
  { label: "Pandas", cat: "データ分析", level: SCORE.ASSISTED },
  { label: "NumPy", cat: "データ分析", level: SCORE.ASSISTED },
  // 不動産
  { label: "土地仕入・ボリューム検討", cat: "不動産", level: SCORE.STRONG },
  { label: "事業収支/DCF（Excel）", cat: "不動産", level: SCORE.STRONG },
  { label: "不動産証券化の基礎", cat: "不動産", level: SCORE.ASSISTED },
  // 金融
  { label: "DCF/NPV・IRR", cat: "金融", level: SCORE.STRONG },
  { label: "LTV/DSCR", cat: "金融", level: SCORE.ASSISTED },
  // DX
  { label: "業務自動化（Python+Excel）", cat: "DX/自動化", level: SCORE.ASSISTED },
  { label: "ダッシュボード試作（Kepler/BI）", cat: "DX/自動化", level: SCORE.ASSISTED },
];

const extraTools = [
  // マーケティング
  { label: "Webマーケティング", cat: "マーケティング", level: SCORE.ASSISTED },
  { label: "SEO・SNS運用", cat: "マーケティング", level: SCORE.ASSISTED },
  { label: "広告運用(Google/Facebook)", cat: "マーケティング", level: SCORE.ASSISTED },
  // PM
  { label: "進行管理", cat: "プロジェクトマネジメント", level: SCORE.STRONG },
  { label: "チームマネジメント", cat: "プロジェクトマネジメント", level: SCORE.STRONG },
  { label: "アジャイル開発管理", cat: "プロジェクトマネジメント", level: 3 },
  // 法務
  { label: "契約・建築法務", cat: "法務・コンプライアンス", level: SCORE.ASSISTED },
  { label: "都市計画法/建築基準法", cat: "法務・コンプライアンス", level: SCORE.ASSISTED },
  // 語学
  { label: "英語業務対応", cat: "語学", level: 3 },
  { label: "ビジネス英語メール", cat: "語学", level: 3 },
  // コミュニケーション
  { label: "プレゼンテーション", cat: "コミュニケーション・プレゼン", level: SCORE.STRONG },
  { label: "ファシリテーション", cat: "コミュニケーション・プレゼン", level: SCORE.STRONG },
  // 教育
  { label: "社内研修講師", cat: "教育・研修", level: 3 },
  { label: "外部セミナー登壇", cat: "教育・研修", level: SCORE.ASSISTED },
  // リサーチ
  { label: "市場調査・競合分析", cat: "リサーチ・分析", level: SCORE.STRONG },
  { label: "ユーザーインタビュー", cat: "リサーチ・分析", level: 3 },
  // 新規事業
  { label: "事業アイデア創出", cat: "イノベーション/新規事業", level: 3 },
  { label: "PoC企画・実施", cat: "イノベーション/新規事業", level: 3 },
  // ESG
  { label: "ESGレポート作成", cat: "サステナビリティ/ESG", level: SCORE.ASSISTED },
  { label: "環境配慮設計", cat: "サステナビリティ/ESG", level: SCORE.ASSISTED },
  // CX
  { label: "顧客満足度分析", cat: "顧客対応・CX", level: SCORE.STRONG },
  { label: "カスタマーサクセス運用", cat: "顧客対応・CX", level: 3 },
  // トレーニング
  { label: "1on1コーチング", cat: "トレーニング・コーチング", level: 3 },
  { label: "キャリア面談", cat: "トレーニング・コーチング", level: 3 },
];

const allToolsRaw = [...baseTools, ...extraTools];

// === 表示順 ===
const CAT_ORDER = [
  "プログラミング",
  "データ分析",
  "DX/自動化",
  "建築・設計",
  "デザイン",
  "GIS・可視化",
  "不動産",
  "金融",
  "マーケティング",
  "プロジェクトマネジメント",
  "法務・コンプライアンス",
  "コミュニケーション・プレゼン",
  "教育・研修",
  "リサーチ・分析",
  "サステナビリティ/ESG",
  "顧客対応・CX",
  "語学",
  "オフィス",
];

const COLORS = {
  strong: "#bb5555", // くすんだ赤
  assisted: "#008877", // 深みのあるティールグリーン
  radarCurrent: "#bb5555",
  radarGrowth: "#008877",
};

export default function SkillsChart() {
  const [selectedCats, setSelectedCats] = useState<string[]>([
    "建築・設計",
    "デザイン",
    "GIS・可視化",
    "不動産",
    "金融",
    "プログラミング",
    "データ分析",
    "DX/自動化",
  ]);
  const [search, setSearch] = useState("");

  const radarData = useMemo(
    () => allCategories.filter((c) => selectedCats.includes(c.label)),
    [selectedCats]
  );

  const tools = useMemo(() => {
    return allToolsRaw
      .filter((t) => selectedCats.includes(t.cat))
      .filter((t) => (search ? t.label.toLowerCase().includes(search.toLowerCase()) : true))
      .slice()
      .sort((a, b) => {
        const byCat = CAT_ORDER.indexOf(a.cat) - CAT_ORDER.indexOf(b.cat);
        if (byCat !== 0) return byCat;
        if (b.level !== a.level) return b.level - a.level;
        return a.label.localeCompare(b.label, "ja");
      })
      .map((d, i) => ({ ...d, idx: i }));
  }, [selectedCats, search]);

  return (
    <div className="min-h-screen w-full bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto mb-8"> {/* mb-8で下に余白 */}
        <div className="flex flex-wrap gap-2">
          {/* カテゴリチップのボタンたち */}
          {CAT_ORDER.map((label) => (
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
                <Radar name="現在" dataKey="current" stroke={COLORS.radarCurrent} fill={COLORS.radarCurrent} fillOpacity={0.35} />
                <Radar name="伸びしろ" dataKey="growth" stroke={COLORS.radarGrowth} fill={COLORS.radarGrowth} fillOpacity={0.25} />
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
                  {tools.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.level === SCORE.STRONG ? COLORS.strong : COLORS.assisted} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[#bb5555]"></span>使える（5）</span>
            <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded bg-[#008877]"></span>AIと一緒/学習中（2）</span>
          </div>
        </section>

        
      </div>
    </div>
  );
}

