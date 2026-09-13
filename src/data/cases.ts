export type CaseStudy = {
  id: string; number: string; category: string; title: string; lead: string;
  image: string; context: string; challenge: string; role: string;
  approach: string[]; outcome: string; skills: string[]; note?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "hotel-investment", number: "01", category: "REAL ESTATE / INVESTMENT",
    title: "ホテル案件の収支検討と取得支援", lead: "土地と建物を、数字だけでも図面だけでもなく、事業として読む。",
    image: "/images/building_osaka.jpg",
    context: "不動産デベロッパーにて、ホテル案件を中心とする収支検討と、用地・不動産の取得に関わる実務を担当。",
    challenge: "市況、運営、建築、資金計画など異なる前提を一つの判断材料に束ね、関係者が検討を進められる状態をつくること。",
    role: "案件情報の整理、収支モデルの検討、リスクと論点の可視化、社内関係者との調整。",
    approach: ["収入・費用・投資条件を構造化し、前提差による感応度を確認", "立地・商品・運営の仮説と数値を往復して検討", "意思決定に必要な論点を短く翻訳し、検討の順序を設計"],
    outcome: "取得判断を支える検討プロセスを実務として経験。守秘義務のため、物件名・金額・個別条件は非公開です。",
    skills: ["収支検討", "用地取得", "ホテル", "事業性評価", "関係者調整"]
  },
  {
    id: "portfolio-analysis", number: "02", category: "REAL ESTATE / STRATEGY",
    title: "保有不動産のポートフォリオ分析", lead: "個別物件の点を、経営判断のための全体像へ。",
    image: "/images/map_realestate_1.png",
    context: "保有資産を横断して捉え、会社としての現在地と検討課題を見える状態にする分析業務。",
    challenge: "性格の異なる資産を共通の視点で比較しながら、数字の羅列ではない示唆へ変換すること。",
    role: "データの整理、評価軸の設計、可視化、示唆の言語化。",
    approach: ["物件情報と事業指標を共通フォーマットへ整理", "複数の評価軸から資産群の偏りと特徴を把握", "経営・事業双方が議論できる表現へ編集"],
    outcome: "ポートフォリオを俯瞰する視点と、個別案件の理解を接続。具体的な数値は公開前に開示可能範囲を確認します。",
    skills: ["ポートフォリオ分析", "データ整理", "可視化", "経営企画"]
  },
  {
    id: "culture-change", number: "03", category: "ORGANIZATION / CHANGE",
    title: "対話から始める組織風土改善", lead: "制度を置く前に、声が届き、行動が変わる回路をつくる。",
    image: "/images/me_mad.jpg",
    context: "複数年にわたる組織風土改善プロジェクト。座談会から始め、360度フィードバック、コーチング、人事との連携へ段階的に展開。",
    challenge: "一度きりのイベントにせず、率直な対話を個人の行動変容と組織の仕組みにつなげること。",
    role: "企画設計、当日運営、参加者との調整、振り返り、次年度施策の構想・推進。",
    approach: ["1年目｜座談会を企画・運営し、課題を言葉にできる場を設計", "2年目｜360度フィードバックとコーチングを導入", "3年目｜人事を巻き込んだ360度評価への接続を構想・推進"],
    outcome: "対話、内省、制度連携を段階的につなぐ実践知を得た。参加人数等の定量情報は公開可能性を確認後に追記予定です。",
    skills: ["組織開発", "ファシリテーション", "360度フィードバック", "プロジェクト運営"]
  },
  {
    id: "dx-community", number: "04", category: "DX / INTERNAL COMMUNITY",
    title: "DX勉強会と社内コミュニティの運営", lead: "ツール導入ではなく、試せる人と会話が増える環境をつくる。",
    image: "/images/webview_shuffle.png",
    context: "DX勉強会を立ち上げ、テーマ設定から告知、運営までを担当。文化部や社内企画の運営も継続。",
    challenge: "関心や習熟度が異なる人々に対し、DXを自分の業務と結びつけられる入口をつくること。",
    role: "自主的な起案、プログラム設計、運営、参加者コミュニケーション。",
    approach: ["業務に近い問いからテーマを設定", "知識提供だけでなく、対話と試行の余白を用意", "継続できる小さな運営単位として設計"],
    outcome: "企画を立てるだけでなく、参加のハードルを下げ、運営を継続する経験を蓄積。",
    skills: ["DX推進", "コミュニティ運営", "企画", "情報発信"]
  },
  {
    id: "regional-collaboration", number: "05", category: "REGION / COLLABORATION",
    title: "行政と協業するコンペ支援", lead: "地域固有の条件と外部のアイデアが出会う接点を整える。",
    image: "/images/mv_ogawamachi_1.png",
    context: "行政と協業するコンペにおいて、関係者間の接続と企画進行を支援。",
    challenge: "立場や言語の異なる関係者の意図を読み、地域の文脈を損なわずに企画へ反映すること。",
    role: "協業の支援、情報整理、コミュニケーションと進行の補助。",
    approach: ["地域側と企画側それぞれの前提を把握", "論点と役割を整理し、対話を進める", "外からの提案を地域の時間軸に接続"],
    outcome: "外部協業における翻訳と関係構築の重要性を学んだ。行政名・コンペ名は許諾確認後に追記します。",
    skills: ["官民連携", "地域協業", "リサーチ", "調整"]
  }
];
