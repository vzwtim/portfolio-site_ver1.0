import Image from "next/image";
import Link from "next/link";
import { hotelProject } from "@/data/featuredProjects";
import styles from "./refresh.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.masthead} aria-labelledby="home-title">
        <div className={styles.mastCopy}>
          <p className={styles.eyebrow}>Yudai Baba / Portfolio</p>
          <h1 id="home-title" className={styles.title}>ぼくは、<br />五目飯。</h1>
          <p className={styles.thesis}>
            場所をよく見て、まだ言葉になっていない価値を読み解く。<br />
            人と仕組みをつなぎながら、使える形まで持っていく。
          </p>
          <nav className={styles.actions} aria-label="ホームの主要リンク">
            <Link className={styles.primaryLink} href={`/projects/${hotelProject.slug}`}>代表事例を読む&nbsp; ↗</Link>
            <Link className={styles.textLink} href="/works">作品を探索する&nbsp; →</Link>
          </nav>
        </div>
        <figure className={styles.heroPlate}>
          <Image className={styles.heroImage} src="/images/mv_gomoku_1.jpg" alt="器に盛り付けた五目飯" fill priority sizes="(max-width: 760px) 100vw, 56vw" />
          <figcaption className={`${styles.plateLabel} ${styles.meta}`}>A portrait in ingredients / 01</figcaption>
        </figure>
      </section>

      <section className={styles.section} aria-labelledby="selected-title">
        <header className={styles.sectionHead}>
          <h2 id="selected-title" className={styles.sectionTitle}>Selected project</h2>
          <p className={styles.meta}>Work / Decision / Delivery</p>
        </header>
        <article className={styles.caseGrid}>
          <div>
            <p className={styles.caseNumber}>{hotelProject.index}</p>
            <p className={styles.meta}>{hotelProject.domain}</p>
            <h3 className={styles.caseTitle}>{hotelProject.title}</h3>
            <p className={styles.body}>{hotelProject.synopsis}</p>
            <Link className={styles.primaryLink} href={`/projects/${hotelProject.slug}`}>背景と判断を読む&nbsp; →</Link>
          </div>
          <dl className={styles.facts}>
            <div className={styles.fact}><dt>ROLE</dt><dd>{hotelProject.roleSummary}</dd></div>
            <div className={styles.fact}><dt>STATUS</dt><dd>{hotelProject.statusLabel}</dd></div>
            <div className={styles.fact}><dt>PROGRESS / RESULT</dt><dd>{hotelProject.resultOrProgress}</dd></div>
          </dl>
        </article>
      </section>

      <section className={`${styles.section} ${styles.noteStrip}`} aria-labelledby="field-title">
        <div><p className={styles.eyebrow}>Field notes / Coming next</p><h2 id="field-title" className={styles.noteTitle}>仕事の外にも、<br />観察は続く。</h2></div>
        <p className={styles.noteCopy}>建築、都市研究、写真、地図、旧街道の自転車旅。記録が確認できたものから、場所と寄り道の関係が見える読み物として編み直します。</p>
      </section>
    </main>
  );
}
