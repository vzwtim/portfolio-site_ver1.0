import Image from "next/image";
import Link from "next/link";
import styles from "@/app/refresh.module.css";

interface YouTubeFeatureProps {
  videoId?: string;
  title?: string;
  channelUrl: string;
}

export default function YouTubeFeature({ videoId, channelUrl, title = "旧街道を、自転車でたどる。" }: YouTubeFeatureProps) {
  if (videoId) {
    return (
      <div className={styles.videoFrame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <article className={styles.videoPending} aria-label="YouTubeで展開する旅の記録">
      <div className={styles.videoPoster}><Image src="/images/trip_tokaido_1.jpg" alt="旧街道を自転車で旅した際の風景" fill sizes="(max-width: 760px) 100vw, 45vw" /></div>
      <div><p className={styles.meta}>YouTube / Field notes</p><h3>{title}</h3><p>経路と風景、寄り道を一本の時間軸で編集するVideo Journal。</p><Link className={styles.youtubeLink} href={channelUrl} target="_blank" rel="noopener noreferrer">YouTubeチャンネルを見る&nbsp; ↗</Link></div>
    </article>
  );
}
