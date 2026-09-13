import styles from "@/app/refresh.module.css";

interface YouTubeFeatureProps {
  videoId?: string;
  title?: string;
}

export default function YouTubeFeature({ videoId, title = "旧街道を、自転車でたどる。" }: YouTubeFeatureProps) {
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
    <div className={styles.videoPending} aria-label="YouTubeで展開する旅の記録">
      <span className={styles.playMark} aria-hidden="true">▶</span>
      <div><p className={styles.meta}>YouTube / Field notes</p><h3>{title}</h3><p>経路と風景、寄り道を一本の時間軸で編集するVideo Journal。</p></div>
    </div>
  );
}
