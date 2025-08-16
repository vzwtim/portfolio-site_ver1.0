export const SCORE = { STRONG: 5, ASSISTED: 2, FUTURE: 1 } as const;

export interface SkillCategory {
  key: string;
  label: string;
  current: number;
  growth: number;
}

export interface SkillTool {
  label: string;
  cat: string;
  level: number;
}

export interface StageSkillData {
  categories: SkillCategory[];
  tools: SkillTool[];
}

const currentCategories: SkillCategory[] = [
  { key: "programming", label: "プログラミング", current: 4, growth: 5 },
  { key: "architecture", label: "建築・設計", current: 5, growth: 4 },
  { key: "design", label: "デザイン", current: 4, growth: 5 },
  { key: "gis", label: "GIS・可視化", current: 5, growth: 4 },
  { key: "office", label: "office365", current: 5, growth: 3 },
  { key: "data", label: "データ分析", current: 2, growth: 5 },
  { key: "realestate", label: "不動産", current: 5, growth: 4 },
  { key: "finance", label: "金融", current: 4, growth: 5 },
  { key: "dx", label: "DX/自動化", current: 3, growth: 5 },
];

const futureCategories: SkillCategory[] = [
  { key: "marketing", label: "マーケティング", current: 3, growth: 5 },
  { key: "pm", label: "プロジェクトマネジメント", current: 4, growth: 5 },
  { key: "legal", label: "法務・コンプライアンス", current: 2, growth: 4 },
  { key: "language", label: "語学", current: 3, growth: 4 },
  { key: "communication", label: "コミュニケーション・プレゼン", current: 4, growth: 5 },
  { key: "education", label: "教育・研修", current: 3, growth: 4 },
  { key: "research", label: "リサーチ・分析", current: 4, growth: 5 },
  { key: "innovation", label: "イノベーション/新規事業", current: 3, growth: 5 },
  { key: "sustainability", label: "サステナビリティ/ESG", current: 2, growth: 5 },
  { key: "customer", label: "顧客対応・CX", current: 1, growth: 1 },
  { key: "training", label: "トレーニング・コーチング", current: 3, growth: 4 },
];

const currentTools: SkillTool[] = [
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
  // office365
  { label: "Excel", cat: "office365", level: SCORE.STRONG },
  { label: "PowerPoint", cat: "office365", level: SCORE.STRONG },
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

const futureTools: SkillTool[] = [
  // マーケティング
  { label: "Webマーケティング", cat: "マーケティング", level: SCORE.ASSISTED },
  { label: "SEO・SNS運用", cat: "マーケティング", level: SCORE.ASSISTED },
  { label: "広告運用(Google/Facebook)", cat: "マーケティング", level: SCORE.ASSISTED },
  // PM
  { label: "進行管理", cat: "プロジェクトマネジメント", level: SCORE.STRONG },
  { label: "チームマネジメント", cat: "プロジェクトマネジメント", level: SCORE.STRONG },
  { label: "アジャイル開発管理", cat: "プロジェクトネジメント", level: 3 },
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
  { label: "顧客満足度分析", cat: "顧客対応・CX", level: 1 },
  { label: "カスタマーサクセス運用", cat: "顧客対応・CX", level: 3 },
  // トレーニング
  { label: "1on1コーチング", cat: "トレーニング・コーチング", level: 3 },
  { label: "キャリア面談", cat: "トレーニング・コーチング", level: 3 },
];

export const careerStages = [
  { key: "current", label: "現在" },
  { key: "future", label: "将来" },
] as const;

export type CareerStageKey = typeof careerStages[number]["key"];

export const skillsByStage: Record<CareerStageKey, StageSkillData> = {
  current: { categories: currentCategories, tools: currentTools },
  future: { categories: futureCategories, tools: futureTools },
};

