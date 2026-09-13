import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/cases";

const domains = [
  ["01", "不動産", "土地・建物・運営を一体で捉え、取得と収支の判断材料をつくる。"],
  ["02", "組織", "対話から仕組みまで、行動が変わるプロセスを段階的に設計する。"],
  ["03", "DX", "技術を目的にせず、現場が試し、学び合える環境を運営する。"],
  ["04", "都市・地域", "歩き、観察し、土地の時間と人の営みから固有の問いを見つける。"],
];

export default function Home() {
  return <main>
    <section className="hero editorial-grid">
      <div className="hero-map" aria-hidden="true" />
      <p className="eyebrow">REAL ESTATE · BUSINESS · ORGANIZATION · FIELDWORK</p>
      <div className="hero-copy">
        <h1>複雑さを、<br/><em>動くかたち</em>に編集する。</h1>
        <p>ひとつの専門に閉じず、空間・不動産・組織・地域を横断しながら、複雑な要素を実行可能な事業や体験へ編集する。</p>
      </div>
      <div className="hero-foot"><span>YUDAI BABA — PORTFOLIO / 2026</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="manifesto section-pad">
      <div className="section-label"><span>01</span> EDITORIAL PRACTICE</div>
      <div className="manifesto-copy"><p className="jp-lead">事業性を読む。人の声を聴く。<br/>土地の履歴をたどる。仕組みを試す。</p><div><p>異なる論理を持つ要素のあいだに立ち、判断できる構造へ編み直すこと。それが、私の仕事です。</p><p className="gomoku-note">“Gomoku rice” — 多様な具材が、ひとつの味になる。<br/>「ぼくは、五目飯。」は、その編集姿勢を表す小さな比喩です。</p></div></div>
      <div className="domains">{domains.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
    </section>

    <section id="work" className="work-section section-pad">
      <div className="section-head"><div className="section-label"><span>02</span> SELECTED WORK</div><h2>考えるだけで終わらせない。<br/>実務のなかで、動かす。</h2><Link href="/works">ALL CASE STUDIES ↗</Link></div>
      <div className="selected-list">{caseStudies.slice(0,4).map((item)=><Link className="selected-row" href={`/works/${item.id}`} key={item.id}><span className="work-num">{item.number}</span><div className="selected-image"><Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 32vw"/></div><div><p className="eyebrow">{item.category}</p><h3>{item.title}</h3><p>{item.lead}</p><div className="skill-line">{item.skills.slice(0,3).join(" / ")}</div></div><span className="arrow">↗</span></Link>)}</div>
    </section>

    <section className="perspective section-pad">
      <div className="perspective-image"><Image src="/images/trip_tokaido_1.jpg" alt="旧街道を自転車でたどる旅の記録" fill sizes="100vw"/><span className="route-line"/></div>
      <div className="perspective-copy"><div className="section-label light"><span>03</span> FIELD NOTES / PERSPECTIVE</div><h2>速く着くためではなく、<br/>途中を読むために移動する。</h2><p>YouTube「旧街道自転車旅」では、道の曲がり、地形の起伏、町の境目を身体でたどります。都市を完成品ではなく、人と時間が積み重なった過程として見るための個人的な探究です。</p><Link href="/photos">FIELD NOTES を見る ↗</Link></div>
    </section>

    <section className="about-brief section-pad"><div className="section-label"><span>04</span> ABOUT</div><div className="about-grid"><h2>建築から、不動産へ。<br/>不動産から、組織と事業へ。</h2><div><p>建築・都市研究を背景に、不動産デベロッパーで取得・収支検討に従事。同時に、組織風土改善やDX勉強会を自ら企画・運営しています。</p><p>図面と数字、制度と感情、地域と事業。その間を行き来できることが強みです。</p><Link className="text-link" href="/about">PROFILE & CAPABILITIES ↗</Link></div></div></section>
    <section className="contact-band"><p>CAREER / COLLABORATION</p><h2>まだ輪郭のない課題から、<br/>一緒に考えられます。</h2><Link href="/contact">CONTACT ↗</Link></section>
  </main>
}
