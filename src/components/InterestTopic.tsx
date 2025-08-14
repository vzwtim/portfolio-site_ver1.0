'use client';

import { motion, useTransform, MotionValue } from 'framer-motion';

interface InterestTopicProps {
  topic: { key: string; title: string; categories: string[] };
  index: number;
  totalTopics: number;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}

const InterestTopic: React.FC<InterestTopicProps> = ({ topic, index, totalTopics, scrollYProgress, onClick }) => {
  const start = index / totalTopics;
  const end = (index + 1) / totalTopics;
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center cursor-pointer"
      onClick={onClick}
      layoutId={`topic-container-${topic.key}`}
    >
      <motion.h2 layoutId={`topic-title-${topic.key}`} className="text-6xl md:text-9xl font-black text-center leading-tight">
        {topic.title}
      </motion.h2>
    </motion.div>
  );
};

export default InterestTopic;
