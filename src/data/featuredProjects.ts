export type ProjectStatus = "completed" | "ongoing" | "planned";

export interface FeaturedProject {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  domain: string;
  status: ProjectStatus;
  statusLabel: string;
  periodLabel: string;
  roleSummary: string;
  resultOrProgress: string;
  synopsis: string;
}

export const hotelProject: FeaturedProject = {
  slug: "hotel-underwriting",
  index: "01",
  title: "初めてのホテル事業を、判断できる収支にする",
  shortTitle: "ホテル事業の収支検討・取得",
  domain: "REAL ESTATE / UNDERWRITING",
  status: "completed",
  statusLabel: "取得まで完了",
  periodLabel: "時期非公開",
  roleSummary:
    "外部オペレーターの開拓・交渉、比較可能な収支モデルと社内説明資料の作成、意思決定プロセスの推進を担当。契約実務は上司が担当。",
  resultOrProgress:
    "複数案を比較できる収支を整え、社内決裁を経て計画地の取得に至った。",
  synopsis:
    "住宅・オフィスを中心としてきた会社で、オペレーショナルアセットとしてのホテルをどう評価するか。既存の住宅収支を置き換えるのではなく、運営方式と事業リスクを比較できる判断材料へ組み直した。",
};

export const featuredProjects: FeaturedProject[] = [hotelProject];
