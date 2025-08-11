import Image from 'next/image';

export default function About() {
  return (
    <main className="bg-[#f7f7f7] text-[#232024] py-20 px-8 md:px-16 lg:px-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-medium mb-16 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
          私について
        </h1>

        {/* Profile Section */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-12 mb-24">
          <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative overflow-hidden rounded-full border-4 border-[#b33953]">
            <Image
              src="/images/mv_gomoku_2.jpg" // プロフィール画像のパス
              alt="YUDAI Profile"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              YUDAI
            </h2>
            <p className="text-lg leading-relaxed mb-4" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              東京大学建築学科を卒業後、不良住宅の研究に没頭。物理的な空間とデジタルな体験の融合を追求する建築家兼ソフトウェアエンジニア。
              一級建築士資格取得を目指しつつ、建築、都市、構造、材料への深い関心を持つ。
            </p>
            <p className="text-lg leading-relaxed" style={{ fontFamily: '"Shippori Mincho", serif' }}>
              MBTIはENTP-A（自己主張型の討論者）。和室でのミニマルな暮らしを愛し、将来的な起業も視野に入れている。
            </p>
          </div>
        </section>

        {/* Career & Education Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-medium mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            経歴・学歴
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>学歴</h3>
              <ul className="list-disc list-inside text-base leading-loose" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                <li>東京大学工学部建築学科 卒業</li>
                <li>東京大学大学院 不良住宅研究室 所属</li>
              </ul>
            </div>
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>職歴</h3>
              <ul className="list-disc list-inside text-base leading-loose" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                <li>〇〇株式会社 建築設計部 (20XX年 - 20YY年)</li>
                <li>△△スタートアップ ソフトウェアエンジニア (20YY年 - 現在)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-3xl font-medium mb-8 text-center" style={{ fontFamily: '"Shippori Mincho", serif' }}>
            スキルセット
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>プログラミング言語</h3>
              <ul className="list-disc list-inside text-base leading-loose" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                <li>JavaScript / TypeScript</li>
                <li>Python</li>
                <li>(その他、必要に応じて追加)</li>
              </ul>
            </div>
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>フレームワーク・ライブラリ</h3>
              <ul className="list-disc list-inside text-base leading-loose" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                <li>Next.js / React</li>
                <li>Tailwind CSS</li>
                <li>(その他、必要に応じて追加)</li>
              </ul>
            </div>
            <div className="border border-gray-200/80 p-6 rounded-sm bg-white/50">
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: '"Shippori Mincho", serif' }}>ツール・ソフトウェア</h3>
              <ul className="list-disc list-inside text-base leading-loose" style={{ fontFamily: '"Shippori Mincho", serif' }}>
                <li>AutoCAD / Revit</li>
                <li>Adobe Creative Suite</li>
                <li>Git / GitHub</li>
                <li>(その他、必要に応じて追加)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}